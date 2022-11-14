import { BaseEntity } from "types";

export type Semester = {
    winter: boolean;
    year: string;
    active: boolean;

} & BaseEntity;