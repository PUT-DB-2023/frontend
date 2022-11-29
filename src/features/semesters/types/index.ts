import { Edition } from "features/editions";
import { BaseEntity } from "types";

export type Semester = {
    winter: boolean;
    start_year: string;
    active: boolean;
    editions: Edition[];

} & BaseEntity;