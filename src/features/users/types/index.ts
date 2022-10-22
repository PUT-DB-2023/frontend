import { BaseEntity } from "types";

export type User = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;

} & BaseEntity;