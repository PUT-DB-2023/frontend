import { axios } from 'lib/axios'
import { User, OldUser } from '../types'
import { UserType } from 'types'
import { toast } from 'react-toastify'

export const addUser = async (user: User) => {
    const response = await axios.post("/users/", user)
    return response.data
}

export const addUserOld = async (user: OldUser, type: UserType) => {
    const t = toast.loading("Dodawanie..")
    const dest = (type === UserType.TEACHER ? "/teachers/" : (type === UserType.ADMIN ? "/admins/" : (type === UserType.STUDENT ? "/students/" : "")))
    const response = await axios.post(dest, user)
    .then((e)=>{toast.update(t, {render: `Pomyślnie dodano użytkownika - ${e.data.name}`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    .catch((e)=>{toast.update(t, {render: `Nie udało się dodać użytkownika - ${e.response.data.name}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    return response
}