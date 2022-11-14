import { Student } from "features/users";
import { BaseEntity, TeacherEdition } from "types";

export type Group = {
    name: string;
    day: string;
    hour: string;
    room: string;
    teacherEdition: TeacherEdition;
    students: Student[];

} & BaseEntity;