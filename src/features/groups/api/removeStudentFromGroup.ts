import { displayError } from 'api/displayError'
import { axios } from 'lib/axios'
import { toast } from 'react-toastify'

export const removeStudentFromGroup = async (groupId: string | undefined, studentId: string | undefined) => {
    const t = toast.loading("Usuwanie..")
    const response = await axios.post(`/remove_student_from_group`, {
        group_id: groupId,
        student_id: studentId,
    })
        .then((e) => { toast.update(t, { render: `Pomyślnie usunięto studenta z grupy`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 }); return e })
        .catch((e) => { toast.update(t, { render: `Nie udało się usunąć studenta z grupy - ${displayError(e.response.data)}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 }); return e })
    return response
}