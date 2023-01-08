import { displayError } from 'api/displayError'
import { axios } from 'lib/axios'
import { toast } from 'react-toastify'
import { SemesterPost } from '../types'

export const updateSemester = async (semester: SemesterPost) => {
    const t = toast.loading("Edytowanie..")
    const response = await axios.patch(`/semesters/${semester.id}/`, semester)
    .then((e)=>{toast.update(t, {render: `Pomyślnie edytowano semestr - ${e.data.name}`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000}); return e})
    .catch((e)=>{toast.update(t, {render: `Nie udało się edytować semestru - ${displayError(e.response.data)}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000}); return e})
    return response.data
}