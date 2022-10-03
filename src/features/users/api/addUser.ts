import { axios } from 'lib/axios'
import { User } from '../types'

export const addUser = async (user: User) => {
    const response = await axios.post("/users/", user)
    return response.data
}