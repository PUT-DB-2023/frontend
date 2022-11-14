import { axios } from 'lib/axios'
import { Admin } from '../types'

export const getAdmin = async (id : string) : Promise<Admin> => {
    const response = await axios.get(`/users/admins/${id}/`)
    return response.data
}