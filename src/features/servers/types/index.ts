import { Provider } from "features/providers";
import { BaseEntity } from "types";

export type Server = {
    name: string;
    host: string;
    port: string;
    dbms: Provider;
    user: string;
    password: string;
    database: string;
    date_created: string;
    create_user_template: string;
    modify_user_template: string;
    delete_user_template: string;
    username_template: string;
    active: boolean;

} & BaseEntity;