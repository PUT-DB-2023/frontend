import { BaseEntity } from "types";

export type Course = {
    name: string;
    description: string;
    active: boolean;
    major: string; // TODO

} & BaseEntity;