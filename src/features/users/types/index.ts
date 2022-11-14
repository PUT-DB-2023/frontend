import { Edition } from "features/editions";
import { Group } from "features/groups/types";
import { BaseEntity, DbAccount } from "types";

export type User = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
} & BaseEntity;

export type Admin = {
} & User

export type Teacher = {
    editions: Edition[];
} & User

export type Student = {
    groups: Group[];
    db_accounts: DbAccount[];

} & User