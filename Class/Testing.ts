import {Student} from '../types/Student';

export class Testing {
	
	public static generateStudent(studentCount: number = 1): Student[] {
		const studentList: Student[] = [];
		
		for(let i = 0; i < studentCount; i++) {
			const student: Student = {name: `TestStudent ${i}`}
			studentList.push(student);
		}
		
		return studentList;
		
	}
	
}