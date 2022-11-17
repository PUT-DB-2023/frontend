import { axios } from 'lib/axios'
import { toast } from 'react-toastify'
import { Course } from '../types'

interface ICourse {
    id: string,
    name: string,
    description: string,
}

export const updateCourse = async (course: ICourse) => {
    const t = toast.loading("Edytowanie..")
    const response = await axios.put(`/courses/${course.id}/`, course)
    .then((e)=>{toast.update(t, {render: "Pomyślnie edytowano przedmiot", type: "success", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    .catch((e)=>{toast.update(t, {render: "Nie udało się edytować przedmiotu", type: "error", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    return response
}