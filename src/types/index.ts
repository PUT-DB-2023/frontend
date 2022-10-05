export type BaseEntity = {
    id: number;
    createdAt: number;
  };

export enum ButtonType {
    ACTION,
    WARNING,
    OUTLINE
}

export enum PanelType {
  LARGE,
  SMALL
}

export enum EditionStatus {
  ACTIVE,
  CLOSED
}

export enum UserType {
  ADMIN,
  TEACHER,
  STUDENT
}