import { displayError } from 'api/displayError'
import { axios } from 'lib/axios'
import { toast } from 'react-toastify'

export const deleteServer = async (id: string|undefined) => {
    const t = toast.loading("Usuwanie..")
    const response = await axios.delete(`/servers/${ id }`)
    .then((e)=>{toast.update(t, {render: `Pomyślnie usunięto serwer`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000}); return e})
    .catch((e)=>{toast.update(t, {render: `Nie udało się usunąć serwera - ${displayError(e.response.data)}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000}); return e})
    return response
}