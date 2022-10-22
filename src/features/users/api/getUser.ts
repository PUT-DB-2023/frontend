import { axios } from 'lib/axios'
import { UserType } from 'types'
import { User } from '../types'

export const getUser = async (userId: any, type? : UserType) => {
    const response = await axios.get(`/users/${userId}/`)
    return response.data

    // let response = null
    // if (type === UserType.ADMIN) response = await axios.get("/admins/")
    // else if (type === UserType.TEACHER) response = await axios.get("/teachers/")
    // else if (type === UserType.STUDENT) response = await axios.get("/students/")

    // if (response != null) return response.data
}