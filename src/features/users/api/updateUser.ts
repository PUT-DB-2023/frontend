import { axios } from 'lib/axios'
import { User } from '../types'
import { OldUser } from '../types'
import { UserType } from 'types'
import { toast } from 'react-toastify'

export const updateUser = async (user: User) => {
    const response = await axios.patch(`/users/${user.id}`, user)
    return response.data
}

export const updateUserOld = async (user: OldUser, type: UserType) => {
    const t = toast.loading("Edytowanie..")
    const dest = (type === UserType.TEACHER ? "/teachers/" : (type === UserType.ADMIN ? "/admins/" : (type === UserType.STUDENT ? "/students/" : ""))) + `${user.id}/`
    const response = await axios.patch(dest, user)
    .then((e)=>{toast.update(t, {render: `Pomyślnie edytowano użytkownika - ${e.data.name}`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    .catch((e)=>{toast.update(t, {render: `Nie udało się edytować użytkownika - ${e.response.data.name}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    return response
}