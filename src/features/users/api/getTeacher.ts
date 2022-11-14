import { axios } from 'lib/axios'
import { Teacher, User } from '../types'

export const getTeacher = async (id : string) : Promise<Teacher> => {
    const response = await axios.get(`/users/teachers/${id}/`)
    return response.data
}