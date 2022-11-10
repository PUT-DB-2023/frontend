import { BaseEntity } from "types";

export type Edition = {
    name: string;
} & BaseEntity;

export type Group = {
    name: string;
    day: string;
    hour: string;
    room: string;
    teacherEdition: Number;

} & BaseEntity;