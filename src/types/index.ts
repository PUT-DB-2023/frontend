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

export enum EditionStatus {
  ACTIVE,
  CLOSED
}

export enum UserType {
  ADMIN,
  TEACHER,
  STUDENT
}