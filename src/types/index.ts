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
  field : string,
  asc : boolean
}

export type FilterOptions = {
  field : string,
  asc : boolean
}

export const testSortOptions : SortOptions[] = [
  {field: 'name', asc: true},
  {field: 'name', asc: false},
  {field: 'age', asc: true},
  {field: 'age', asc: false},
]

export type DbAccount = {
  username : string,
  password : string,
  additional_info : string,
  isMovedToExtDB : boolean
} & BaseEntity