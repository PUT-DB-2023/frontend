import { displayError } from 'api/displayError'
import { axios } from 'lib/axios'
import { toast } from 'react-toastify'

export const addStudentsFile = async (data: FormData) => {
    const t = toast.loading("Dodawanie...")
    const response = await axios({
        method: 'post',
        url: '/load_students_csv',
        data: data
    })
    .then((e)=>{toast.update(t, {render: `Operacja przebiegła pomyślnie`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 8000}); return e})
    .catch((e)=>{toast.update(t, {render: `Operacja zakończyła się błędem.\n${e.response.data.name} - ${displayError(e.response.data)}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 8000}); return e})    
    return response.data
}