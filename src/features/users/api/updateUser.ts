import { axios } from 'lib/axios'
import { User } from '../types'

export const updateUser = async (user: User) => {
    const response = await axios.patch(`/users/${user.id}`, user)
    return response.data
}