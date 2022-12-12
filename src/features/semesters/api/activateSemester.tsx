import { axios } from 'lib/axios'
import { toast } from 'react-toastify';
import { Semester } from '../types'

export const activateSemester = async (semesterId: string|undefined) => {
    const t = toast.loading("Aktywowanie semestru..")
    const response = await axios.post(`/change_active_semester`, {
        'semester_id': semesterId  
    })
    .then((e)=>{toast.update(t, {render: `Pomyślnie aktywowano semestr.`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 8000}); console.log(e.data); return e})
    .catch((e)=>{toast.update(t, {render: `Nie udało się aktywować semestru \n${e.response.data.name}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 8000}); return e})

    return response
}