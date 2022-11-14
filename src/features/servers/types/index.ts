import { BaseEntity } from "types";

export type Server = {
    name: string;
    ip: string;
    port: string;
    provider: string;
    user: string;
    password: string;
    database: string;
    date_created: string;
    create_user_template: string;
    active: boolean;

} & BaseEntity;