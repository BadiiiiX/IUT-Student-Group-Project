/**
 * The objective is to have a list of User and regroup them by two with a specified time and to be different each week
 * Project created by BadiiiX
 */

//TODO : Manage when student list is odd and not even :D

import {Testing}          from './Class/Testing';
import {Group, GroupList} from './types/Student';
import {GroupManager}     from './Class/GroupManager';

(async () => {
	
	const NB_STUDENT = 10;
	
	const studentList = Testing.generateStudent(NB_STUDENT);
	const groupManager: GroupManager = new GroupManager(studentList)
	
	/**
	 *    >>   TestStudent 0 & TestStudent 9
	 *    >>   TestStudent 1 & TestStudent 8
	 *    >>   TestStudent 2 & TestStudent 7
	 *    >>   TestStudent 3 & TestStudent 6
	 *    >>   TestStudent 4 & TestStudent 5
	 */
	
	const groupList: GroupList = [
		{firstStudent: studentList[0], secondStudent: studentList[9]},
		{firstStudent: studentList[1], secondStudent: studentList[8]},
		{firstStudent: studentList[2], secondStudent: studentList[7]},
		{firstStudent: studentList[3], secondStudent: studentList[6]},
		{firstStudent: studentList[4], secondStudent: studentList[5]},
	]
	
	const alreadyCreatedGroups: GroupList[] = [
	  groupList
	]
	
	const groups: Map<number, GroupList> = groupManager.generateTeams(alreadyCreatedGroups);
	
	groupManager.showTeams(groups);
	
})();

 