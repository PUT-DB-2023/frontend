import { axios } from 'lib/axios'
import { User } from '../types'

export const deleteUser = async ({ id } : any) => {
    const response = await axios.delete(`/users/${ id }`, id)
    return response.data
}