import { BaseEntity } from "types";

export type Edition = {
    name: string;
    active: boolean;

} & BaseEntity;