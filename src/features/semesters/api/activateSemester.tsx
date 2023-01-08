import { displayError } from 'api/displayError';
import { axios } from 'lib/axios';
import { toast } from 'react-toastify';

export const activateSemester = async (semesterId: string|undefined) => {
    const t = toast.loading("Aktywowanie semestru..")
    const response = await axios.post(`/change_active_semester`, {
        'semester_id': semesterId  
    })
    .then((e)=>{toast.update(t, {render: `Pomyślnie aktywowano semestr.`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 8000}); return e})
    .catch((e)=>{toast.update(t, {render: `Nie udało się aktywować semestru - ${displayError(e.response.data)}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 8000}); return e})
    
    return response
}