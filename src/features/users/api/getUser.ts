import { axios } from 'lib/axios'
import { User } from '../types'

export const getUser = async (editionId: any) => {
    const response = await axios.get(`/users/${editionId}/`)
    return response.data
}