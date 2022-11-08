export type BaseEntity = {
    id: number;
    createdAt: number;
  };

export enum ButtonType {
    ACTION,
    WARNING,
    OUTLINE,
    TEXT_WARNING,
    TEXT_ACTION
}

export enum PanelType {
  HEADER,
  CONTENT
}

export enum Status {
  ACTIVE,
  INACTIVE
}

export enum UserType {
  ADMIN,
  TEACHER,
  STUDENT
}

export type SortOptions = {
  name : string;
  field : string,
  asc : boolean
}

export type FilterOptions = {
  field : string,
  asc : boolean
}

export const coursesSortOptions : SortOptions[] = [
  {name: 'Nazwa', field: 'name', asc: true},
  {name: 'Nazwa', field: 'name', asc: false},
]

export const editionsSortOptions : SortOptions[] = [
  {name: 'Nazwa', field: 'description', asc: true},
  {name: 'Nazwa', field: 'description', asc: false},
]

export const groupsSortOptions : SortOptions[] = [
  {name: 'Nazwa', field: 'name', asc: true},
  {name: 'Nazwa', field: 'name', asc: false},
]

export const serversSortOptions : SortOptions[] = [
  {name: 'Nazwa', field: 'name', asc: true},
  {name: 'Nazwa', field: 'name', asc: false},
]

export type DbAccount = {
  username : string,
  password : string,
  additional_info : string,
  is_moved : boolean
} & BaseEntity