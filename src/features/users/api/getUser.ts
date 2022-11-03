import { axios } from 'lib/axios'
import { UserType } from 'types'
import { User } from '../types'

export const getUser = async (userId: any, type? : UserType) => {
    let response = null
    if (type === UserType.ADMIN) response = await axios.get(`/admins/${userId}/`)
    else if (type === UserType.TEACHER) response = await axios.get(`/teachers/${userId}/`)
    else if (type === UserType.STUDENT) response = await axios.get(`/students/${userId}/`)

    if (response != null) return response.data
}