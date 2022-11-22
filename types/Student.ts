export type Student = {
	name: string;
}

export type Group = {
	firstStudent: Student;
	secondStudent: Student;
}

export type GroupList = Group[];