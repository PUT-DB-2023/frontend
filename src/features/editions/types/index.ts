import { Course } from "features/courses";
import { Semester } from "features/semesters";
import { Server } from "features/servers";
import { Teacher, User } from "features/users";
import { BaseEntity } from "types";

export type Edition = {
    description: string;
    date_opened: Date,
    date_closed: Date,
    semester: Semester;
    course: Course;
    teachers: Teacher[];
    servers: Server[];

} & BaseEntity;