import { BaseEntity } from "types";

export type Course = {
    name: string;
    description: string;
    major: string; // TODO

} & BaseEntity;