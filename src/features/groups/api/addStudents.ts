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
    .then((e)=>{toast.update(t, {render: "Pomyślnie dodano studentów", type: "success", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    .catch((e)=>{toast.update(t, {render: "Nie udało się dodać studentów", type: "error", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    return response
}