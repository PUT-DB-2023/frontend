import { displayError } from 'api/displayError'
import { axios } from 'lib/axios'
import { toast } from 'react-toastify'
import { Server } from '../types'

export const updateServer = async (server: Server) => {
    const t = toast.loading("Edytowanie..")
    const response = await axios.patch(`/servers/${server.id}/`, server)
        .then((e) => { toast.update(t, { render: `Pomyślnie edytowano serwer - ${e.data.name}`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 }); return e })
        .catch((e) => { toast.update(t, { render: `Nie udało się edytować serwera - ${displayError(e.response.data)}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 }); return e })
    return response.data
}