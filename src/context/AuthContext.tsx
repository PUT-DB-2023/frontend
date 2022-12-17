import { createContext, Dispatch, ReactNode, SetStateAction, useReducer, useState } from "react"
import { AuthUserInfo } from "types";

const initialState = {
    id: '1',
    first_name: 'TEST',
    last_name: 'TEST',
    role: 'TEST',
}

export const authReducer = ({state, action}: any) => {
    console.log(state, action);
    
    switch (action.type) {
        case 'LOGIN':
            return {
                authUsername: action.payload
            }
        case 'LOGOUT':
            return {
                authUsername: ''
            }
        default:
            return state
    }
}

export const AuthContext = createContext<
    {
        authUser: AuthUserInfo;
        setAuthUser: Dispatch<SetStateAction<AuthUserInfo>>
    }>
    ({
    authUser: initialState,
    setAuthUser: () => null
})

export const AuthProvider = ({children}: {children: ReactNode}) => {
    // const [state, dispatch] = useReducer(authReducer, {
    //     authUser: null
    // })

    const [authUser, setAuthUser] = useState<AuthUserInfo>(initialState)

    console.log('-----------------------------------------AuthContext state:', authUser);
    
    return (
        <AuthContext.Provider value={{authUser, setAuthUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext