import { axios } from 'lib/axios'
import { User } from '../types'

export const getAdmins = async () => {
    const response = await axios.get(`/admins`)
    return response.data
}