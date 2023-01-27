import { displayError } from 'api/displayError'
import { axios } from 'lib/axios'
import { toast } from 'react-toastify'
import { Course } from '../types'

export const deleteCourse = async (id: string|undefined) => {
    const t = toast.loading("Usuwanie..")
    const response = await axios.delete(`/courses/${ id }`)
    .then((e)=>{toast.update(t, {render: `Pomyślnie usunięto przedmiot`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000}); return {status: 1, response: e}})
    .catch((e)=>{toast.update(t, {render: `Nie udało się usunąć przedmiotu - ${displayError(e.response.data)}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000}); return {status: 0, response: e}})
    return response
}