import { axios } from 'lib/axios'
import { toast } from 'react-toastify'
import { Server } from '../types'

export const addServer = async (server: Server) => {
    const t = toast.loading("Dodawanie..")
    const response = await axios.post("/servers/", server)
    .then((e)=>{toast.update(t, {render: `Pomyślnie dodano serwer - ${e.data.name}`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 8000}); return e})
    .catch((e)=>{toast.update(t, {render: `Nie udało się dodać serwera \n${e.response.data.name}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 8000}); return e})
    return response
}