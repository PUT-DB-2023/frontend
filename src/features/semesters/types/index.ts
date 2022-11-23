import { Edition } from "features/editions";
import { BaseEntity } from "types";

export type Semester = {
    winter: boolean;
    year: string;
    active: boolean;
    editions: Edition[];

} & BaseEntity;