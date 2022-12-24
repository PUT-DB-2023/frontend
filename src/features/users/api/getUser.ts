import { axios } from 'lib/axios'
import { UserType } from 'types'
import { Admin, Student, Teacher, User } from '../types'

export const getUser = async (userId: string|undefined, type? : UserType) => {
    let response = null
    if (type === UserType.ADMIN) response = await axios.get(`/users/${userId}/`)
    else if (type === UserType.TEACHER) response = await axios.get(`/teachers/${userId}/`)
    else if (type === UserType.STUDENT) response = await axios.get(`/students/${userId}/`)
    else response = await axios.get(`/users/${userId}`)

    return response.data
}