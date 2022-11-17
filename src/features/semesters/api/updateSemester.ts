import { axios } from 'lib/axios'
import { toast } from 'react-toastify'
import { Semester } from '../types'
import { ISemester } from './addSemester'

export interface ISem extends ISemester {
    id: string,
}

export const updateSemester = async (semester: ISem) => {
    const t = toast.loading("Edytowanie..")
    const response = await axios.patch(`/semesters/${semester.id}/`, semester)
    .then((e)=>{toast.update(t, {render: "Pomyślnie edytowano semestr", type: "success", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    .catch((e)=>{toast.update(t, {render: "Nie udało się edytować semestru", type: "error", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    return response
}