import { User } from "features/users";

export type AuthUser = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    is_student: boolean;
    is_teacher: boolean;
    is_superuser: boolean;
} & User