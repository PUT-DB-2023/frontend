import { BaseEntity } from "types";

export type User = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;

} & BaseEntity;