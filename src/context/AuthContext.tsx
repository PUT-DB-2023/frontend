import { createContext, Dispatch, ReactNode, SetStateAction, useReducer, useState } from "react"
import { AuthUserInfo } from "types";

export const initialAuthUserInfo: AuthUserInfo = {
    id: '',
    first_name: '',
    last_name: '',
    role: '',
}

// export const authReducer = ({state, action}: any) => {
//     console.log(state, action);
    
//     switch (action.type) {
//         case 'LOGIN':
//             return {
//                 authUsername: action.payload
//             }
//         case 'LOGOUT':
//             return {
//                 authUsername: ''
//             }
//         default:
//             return state
//     }
// }

export const AuthContext = createContext<
    {
        authUser: AuthUserInfo;
        setAuthUser: Dispatch<SetStateAction<AuthUserInfo>>
    }>
    ({
    authUser: initialAuthUserInfo,
    setAuthUser: () => null
})

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [authUser, setAuthUser] = useState<AuthUserInfo>(initialAuthUserInfo)

    console.log('-----------------------------------------AuthContext state:', authUser);
    
    return (
        <AuthContext.Provider value={{authUser, setAuthUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext