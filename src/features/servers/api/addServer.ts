import { axios } from 'lib/axios'

export interface IServer {
    name: string,
    ip: string,
    port: string,
    provider: string,
    user: string,
    password: string,
    database: string,
    active: boolean,
}

export const addServer = async (server: IServer) => {
    const response = await axios.post("/servers/", server)
    .then((e)=>{return e})
    .catch((e)=>{return e})
    return response
}