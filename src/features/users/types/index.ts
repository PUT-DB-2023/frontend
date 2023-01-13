import { Edition } from "features/editions";
import { Group } from "features/groups/types";
import { Major } from "features/majors";
import { BaseEntity, DbAccount } from "types";

export type User = {
    first_name: string;
    last_name: string;
    email: string;
    is_student: boolean;
    is_teacher: boolean;
    is_active: boolean;
    is_superuser: boolean;
    permissions: string[];
} & BaseEntity;

export type Admin = {
} & User

export type Teacher = {
    id: string;
    user: User;
    editions: Edition[];
}

export type Student = {
    id: string;
    user: User;
    student_id: string;
    major: Major;
    groups: Group[];
    db_accounts: DbAccount[];
}

export type OldUser = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    student_id?: string;
    id?: string;
    major?: Major;
}