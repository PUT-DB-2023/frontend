import { axios } from 'lib/axios'
import { Server } from '../types'

export const getServer = async (editionId: string | undefined): Promise<Server> => {
    const response = await axios.get(`/servers/${editionId}/`)
    return response.data
}