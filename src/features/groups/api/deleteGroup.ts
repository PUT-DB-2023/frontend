import { displayError } from 'api/displayError'
import { axios } from 'lib/axios'
import { toast } from 'react-toastify'

export const deleteGroup = async (id: string|undefined) => {
    const t = toast.loading("Usuwanie..")
    const response = await axios.delete(`/groups/${ id }`)
    .then((e)=>{toast.update(t, {render: `Pomyślnie usunięto grupę`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 8000}); return e})
    .catch((e)=>{toast.update(t, {render: `Nie udało się usunąć grupy - ${displayError(e.response.data)}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 8000}); return e})

    return response
}