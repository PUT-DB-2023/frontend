import { Student, Teacher } from '../types';

export function isStudent(obj: any): obj is Student {
    return 'student_id' in obj;
}

export function isTeacher(obj: any): obj is Teacher {
    return 'editions' in obj;
}

export function isStudentOrTeacher(obj: any): obj is Student | Teacher {
    return 'user' in obj;
}