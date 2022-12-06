import { axios } from 'lib/axios'
import { toast } from 'react-toastify';
import { Semester } from '../types'

export const activateSemester = async (semesterId: string|undefined) => {
    console.log('ACTIVATE SEMESTER API', semesterId)
    const t = toast.loading("Aktywowanie semestru..")
    const response = await axios.post(`/change_active_semester`, {
        'semester_id': semesterId  
    })
    .then((e)=>{toast.update(t, {render: "Pomyślnie aktywowano semestr", type: "success", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    .catch((e)=>{toast.update(t, {render: "Nie udało się aktywować semestru", type: "error", isLoading: false, closeButton: true, autoClose: 5000}); return e})

    console.log('reposmse', response)
    return response
}