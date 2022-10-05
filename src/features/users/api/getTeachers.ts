import { axios } from 'lib/axios'
import { User } from '../types'

export const getTeachers = async () => {
    const response = await axios.get(`/users/teachers`)
    return response.data
}