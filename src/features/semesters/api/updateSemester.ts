import { axios } from 'lib/axios'
import { toast } from 'react-toastify'
import { Semester, SemesterPost } from '../types'

export const updateSemester = async (semester: SemesterPost) => {
    const t = toast.loading("Edytowanie..")
    const response = await axios.patch(`/semesters/${semester.id}/`, semester)
    .then((e)=>{toast.update(t, {render: "Pomyślnie edytowano semestr", type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    .catch((e)=>{toast.update(t, {render: "Nie udało się edytować semestru", type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    return response
}