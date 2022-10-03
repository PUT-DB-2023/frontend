import { axios } from 'lib/axios'
import { Server } from '../types'

export const addServer = async (server: Server) => {
    const response = await axios.post("/servers/", server)
    return response.data
}