import { Course } from "features/courses";
import { BaseEntity, SortOptions } from "types";

export type Major = {
    name: string;
    description: string;
    // courses: Course[];
    // students: string[];

} & BaseEntity;

export const majorsSortOptions : SortOptions[] = [
    {name: 'Nazwa', field: 'name', asc: true},
    {name: 'Nazwa', field: 'name', asc: false},
  ]