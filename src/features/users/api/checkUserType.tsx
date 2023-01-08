import { Student, Teacher } from '../types';

export function isStudent(obj: any): obj is Student {
    return 'student_id' in obj;
}

export function isTeacher(obj: any): obj is Teacher {
    return 'editions' in obj;
}
