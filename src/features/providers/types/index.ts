import { BaseEntity, SortOptions } from "types";

export type Provider = {
    name: string;
    description: string;

} & BaseEntity;

export const majorsSortOptions : SortOptions[] = [
    {name: 'Nazwa', field: 'name', asc: true},
    {name: 'Nazwa', field: 'name', asc: false},
  ]