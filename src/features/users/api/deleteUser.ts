import { axios } from 'lib/axios'
import { UserType } from 'types'
import { toast } from 'react-toastify'


export const deleteUser = async ({ id } : any) => {
    const response = await axios.delete(`/users/${ id }`, id)
    return response.data
}

export const deleteUserOld = async (id: any, type: UserType) => {
    const t = toast.loading("Usuwanie..")
    const dest = (type === UserType.TEACHER ? "/teachers/" : (type === UserType.ADMIN ? "/admins/" : (type === UserType.STUDENT ? "/students/" : ""))) + id;
    const response = await axios.delete(dest, id)
    .then((e)=>{toast.update(t, {render: `Pomyślnie usunięto użytkownika`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 8000}); return e})
    .catch((e)=>{toast.update(t, {render: `Nie udało się usunąć użytkownika \n${e.response.data.name}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 8000}); return e})
    return response;
}