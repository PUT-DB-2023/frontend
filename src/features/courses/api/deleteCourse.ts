import { axios } from 'lib/axios'
import { toast } from 'react-toastify'
import { Course } from '../types'

export const deleteCourse = async (id: string|undefined) => {
    const t = toast.loading("Usuwanie..")
    const response = await axios.delete(`/courses/${ id }`)
    // .then((e)=>{toast.update(t, {render: `Pomyślnie usunięto przedmiot`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 8000}); return e})
    .then((e)=>{toast.update(t, {render: `Pomyślnie usunięto przedmiot`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 8000}); return e})
    .catch((e)=>{toast.update(t, {render: `Nie udało się usunąć przedmiotu" \n${e.response.data.name}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 8000}); return e})
    return response
}