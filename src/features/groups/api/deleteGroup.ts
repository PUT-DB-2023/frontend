import { axios } from 'lib/axios'
import { toast } from 'react-toastify'

export const deleteGroup = async (id: string|undefined) => {
    const t = toast.loading("Usuwanie..")
    const response = await axios.delete(`/groups/${ id }`)
    .then((e)=>{toast.update(t, {render: "Pomyślnie usunięto grupę", type: "success", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    .catch((e)=>{toast.update(t, {render: "Nie udało się usunąć grupy", type: "error", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    return response
}