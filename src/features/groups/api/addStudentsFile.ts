import { axios } from 'lib/axios'
import { toast } from 'react-toastify'

export const addStudentsFile = async (data: FormData) => {
    const t = toast.loading("Dodawanie...")
    const response = await axios({
        method: 'post',
        url: '/load_students_csv',
        data: data
    })
    .then((e)=>{toast.update(t, {render: `Operacja przebiegła pomyślnie`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    .catch((e)=>{toast.update(t, {render: `Operacja zakończyła się błędem - ${e.response.data}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 5000}); console.log(e.response);  return e})
    console.log('resp', response);
    
    return response
}