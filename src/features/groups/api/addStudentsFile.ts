import { axios } from 'lib/axios'
import { toast } from 'react-toastify'

export const addStudentsFile = async (data: FormData) => {
    const t = toast.loading("Dodawanie...")
    const response = await axios({
        method: 'post',
        url: '/load_students_csv',
        data: data
    })
    .then((e)=>{toast.update(t, {render: "Pomyślnie dodano studentów", type: "success", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    .catch((e)=>{toast.update(t, {render: `Nie udało się dodać studentów - ${e.response.data}`, type: "error", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    return response
}