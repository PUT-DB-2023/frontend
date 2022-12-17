import React from 'react'
import { useQuery } from 'react-query'
import { AuthUserInfo } from 'types'

export const getAuthUserInfoFromStorage = async () : Promise<any> => {
    const authUserInfo : AuthUserInfo = {
        id: localStorage.getItem('auth_user_id')!,
        first_name: localStorage.getItem('auth_user_first_name')!,
        last_name: localStorage.getItem('auth_user_last_name')!,
        role: localStorage.getItem('auth_user_role')!,
    }
    return authUserInfo
}

export const useAuthUserInfo = () => {
    const {data: authUserData, status: authUserStatus, refetch: authUserRefetch} = useQuery(['authUser'], getAuthUserInfoFromStorage)

    return {authUserData, authUserRefetch}
}
