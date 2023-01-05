import { AuthUser } from "features/auth";
import { Student, Teacher, User } from "features/users";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export const initialAuthUserInfo: User = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    is_active: false,
    is_student: false,
    is_teacher: false,
    is_superuser: false,
    permissions: []
}

export const AuthContext = createContext<
    {
        authUser: User;
        setAuthUser: Dispatch<SetStateAction<User>>;
        checkPermission: (permission: string) => boolean
    }>
    ({
    authUser: initialAuthUserInfo,
    setAuthUser: () => null,
    checkPermission: (permission: string) => false
})

export const AuthProvider = ({children}: {children: ReactNode}) => {
    let authenticatedUser: User = initialAuthUserInfo
    try {
        authenticatedUser = JSON.parse(localStorage.getItem('auth_user') || "")
    }
    catch (error){}
    const [authUser, setAuthUser] = useState<User>(authenticatedUser)

    const checkPermission = (permission: string) => {
        return authUser?.permissions?.includes(permission);
    }

    return (
        <AuthContext.Provider value={{authUser, setAuthUser, checkPermission}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext