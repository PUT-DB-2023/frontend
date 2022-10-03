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
  HEADER,
  CONTENT
}

export enum EditionStatus {
  ACTIVE,
  CLOSED
}