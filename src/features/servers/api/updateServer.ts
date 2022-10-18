import { axios } from 'lib/axios'
import { Server } from '../types'
import { IServer } from './addServer'

export interface IServ extends IServer {
    id: string,
}

export const updateServer = async (server: IServ) => {
    const response = await axios.patch(`/servers/${server.id}/`, server)
    .then((e)=>{return e})
    .catch((e)=>{return e})
    return response
}