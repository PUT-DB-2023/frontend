import { Course } from "features/courses";
import { Edition } from "features/editions";
import { Teacher } from "features/users";
import { Server } from "http";

export interface ToastMessages {
  pending: string;
  success: string;
  error: string;
}

export type BaseEntity = {
    id: string;
    createdAt: number;
} & unknown;

export type TeacherEdition = {
  teacher: Teacher;
  edition: Edition;
} & BaseEntity

export type EditionServer = {
  edition: Edition;
  server: Server;
  additional_info: string;
  username_template: string;
  passwd_template: string;
} & BaseEntity

export type DbAccount = {
  username : string,
  password : string,
  additional_info : string,
  is_moved : boolean;
  editionServer: EditionServer;
} & BaseEntity

export enum ButtonType {
    ACTION,
    WARNING,
    OUTLINE,
    TEXT_WARNING,
    TEXT_ACTION,
    LOAD_HIDDEN
}

export enum PanelType {
  HEADER,
  CONTENT,
  OUTLINE,
  GRADIENT
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

export const semestersSortOptions : SortOptions[] = [
  {name: 'Nazwa', field: 'name', asc: true},
  {name: 'Nazwa', field: 'name', asc: false},
]