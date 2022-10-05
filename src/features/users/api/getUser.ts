import { axios } from 'lib/axios'
import { User } from '../types'

export const getUser = async (userId: any) => {
    const response = await axios.get(`/users/${userId}/`)
    return response.data
}