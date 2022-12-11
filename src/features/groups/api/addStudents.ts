import { axios } from 'lib/axios'
import { format } from 'date-fns'
import { toast } from 'react-toastify';

export interface IAddStudentsToGroup {
    id: string,
    students: any[],
}

export const addStudents = async (students: IAddStudentsToGroup) => {
    const t = toast.loading("Dodawanie..")
    const response = await axios.patch(`/groups/${students.id}/`, students)
    .then((e)=>{toast.update(t, {render: `Pomyślnie dodano studentów - ${e.data.name}`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    .catch((e)=>{toast.update(t, {render: `Nie udało się dodać studentów - ${e.response.data.name}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    return response
}