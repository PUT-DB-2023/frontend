import { axios } from 'lib/axios'
import { toast } from 'react-toastify'
import { Server } from '../types'
import { IServer } from './addServer'

export interface IServ extends IServer {
    id: string,
}

export const updateServer = async (server: Server) => {
    const t = toast.loading("Edytowanie..")
    const response = await axios.patch(`/servers/${server.id}/`, server)
    .then((e)=>{toast.update(t, {render: "Pomyślnie edytowano serwer", type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    .catch((e)=>{toast.update(t, {render: "Nie udało się edytować serwera", type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    return response
}