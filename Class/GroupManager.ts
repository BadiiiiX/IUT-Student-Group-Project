import {Group, GroupList, Student} from '../types/Student';
import * as process                from 'process';

export class GroupManager {
	
	private readonly students: Student[];
	
	public constructor(students: Student[]) {
		this.students = students;
	}
	
	private randomizeStudents = (): void => {
		for(let i = this.students.length - 1; i > 0; i--) {
			const j = ~~(Math.random() * (i + 1));
			[this.students[i], this.students[j]] = [this.students[j], this.students[i]];
		}
	};
	
	private checkIfSameGroup = (groupOne: Group, groupTwo: Group): boolean => {
		if(groupOne.firstStudent === groupTwo.firstStudent && groupOne.secondStudent === groupTwo.secondStudent) return true;
		return groupOne.firstStudent === groupTwo.secondStudent && groupOne.secondStudent === groupTwo.firstStudent;
	};
	
	private checkIfSameGroupList = (groupListOne: GroupList, groupListTwo: GroupList): boolean => {
		let counter = 0;
		
		for(let flGroup = 0; flGroup < groupListOne.length; flGroup++) {
			const fGroup = groupListOne[flGroup];
			
			for(let slGroup = 0; slGroup < groupListTwo.length; slGroup++) {
				const sGroup = groupListTwo[slGroup];
				
				if(this.checkIfSameGroup(fGroup, sGroup)) {
					counter++;
					break;
				}
			}
		}
		
		return groupListOne.length === counter || groupListTwo.length === counter;
	};
	
	private checkIfGroupListExist = (listOfGroupList: GroupList[], actualGroupList: GroupList): boolean => {
		
		for(const groupList of listOfGroupList) {
			if(!this.checkIfSameGroupList(groupList, actualGroupList)) return false;
		}
		
		return true;
	};
	
	public generateTeams = (groupListAlreadyCreated: GroupList[] = []): Map<number, GroupList> => {
		const groupsToReturn: Map<number, GroupList> = new Map();
		const NB_STUDENT_HALF = parseInt(String(this.students.length / 2), 10);
		this.randomizeStudents();
		
		for(let round = 0; round < NB_STUDENT_HALF; round++) {
			
			let actualGroup = 0;
			const groupList: GroupList = [];
			
			for(let i = round; i < NB_STUDENT_HALF; i++, actualGroup++) {
				const fStudent: Student = this.students[i];
				const sStudent: Student = this.students[this.students.length - actualGroup - 1];
				
				const group: Group = {firstStudent: fStudent, secondStudent: sStudent};
				
				groupList.push(group);
			}
			
			let requiredGroup = actualGroup + 1;
			for(let remaining = 0; remaining < round; remaining++, requiredGroup++) {
				const fStudent: Student = this.students[remaining];
				const sStudent: Student = this.students[requiredGroup];
				
				const group: Group = {firstStudent: fStudent, secondStudent: sStudent};
				groupList.push(group);
			}
			
			if(!this.checkIfGroupListExist(groupListAlreadyCreated, groupList)) {
				groupsToReturn.set(round, groupList);
			}
		}
		
		return groupsToReturn;
	};
	
	public showTeams = (teams: Map<number, GroupList>): void => {
		for(const [key, value] of teams) {
			console.log(`Semaine ${key + 1}`);
			value.forEach(({firstStudent, secondStudent}: Group) => {
				console.log(`   >>   ${firstStudent.name} & ${secondStudent.name}`);
			});
		}
	};
	
}