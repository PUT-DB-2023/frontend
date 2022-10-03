import { axios } from 'lib/axios'
import { Server } from '../types'

export const updateServer = async (server: Server) => {
    const response = await axios.patch(`/servers/${server.id}`, server)
    return response.data
}