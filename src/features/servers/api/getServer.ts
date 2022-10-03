import { axios } from 'lib/axios'
import { Server } from '../types'

export const getServer = async (editionId: any) => {
    const response = await axios.get(`/servers/${editionId}/`)
    return response.data
}