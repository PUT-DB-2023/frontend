import { displayError } from 'api/displayError'
import { axios } from 'lib/axios'
import { toast } from 'react-toastify'

interface ICourse {
    id: string,
    name: string,
    major?: string,
    description: string,
}

export const updateCourse = async (course: ICourse) => {
    const t = toast.loading("Edytowanie..")
    const response = await axios.put(`/courses/${course.id}/`, course)
        .then((e) => { toast.update(t, { render: `Pomyślnie edytowano przedmiot - ${e.data.name}`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 }); return e })
        .catch((e) => { toast.update(t, { render: `Nie udało się edytować przedmiotu - ${displayError(e.response.data)}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 }); return e })
    return response.data
}