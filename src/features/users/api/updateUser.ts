import { axios } from 'lib/axios'
import { OldUser, Student, Teacher, User } from '../types'
import { UserType } from 'types'
import { toast } from 'react-toastify'

// export const updateUser = async (user: User) => {
//     const response = await axios.patch(`/users/${user.id}`, user)
//     return response.data
// }

export const updateUserNew = async (data: Student | Teacher | User, type: UserType) => {
    const t = toast.loading("Edytowanie..")
    const dest = (type === UserType.TEACHER ? "/teachers/" : (type === UserType.ADMIN ? "/users/" : (type === UserType.STUDENT ? "/students/" : ""))) + `${data.id}/`
    const response = await axios.patch(dest, data)
        .then((e) => { toast.update(t, { render: `Pomyślnie edytowano użytkownika - ${type === UserType.ADMIN ? e.data.first_name : e.data.user.first_name} ${type === UserType.ADMIN ? e.data.last_name : e.data.user.last_name}`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 8000 }); return e })
        .catch((e) => { toast.update(t, { render: `Nie udało się edytować użytkownika \n${e.response.data.name}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 8000 }); return e })
    return response.data
}

export const updateUserOld = async (data: OldUser, type: UserType) => {
    const t = toast.loading("Edytowanie..")
    const dest = (type === UserType.TEACHER ? "/teachers/" : (type === UserType.ADMIN ? "/users/" : (type === UserType.STUDENT ? "/students/" : ""))) + `${data.id}/`
    const response = await axios.patch(dest, data)
        .then((e) => { toast.update(t, { render: `Pomyślnie edytowano użytkownika - ${type === UserType.ADMIN ? e.data.first_name : e.data.user.first_name} ${type === UserType.ADMIN ? e.data.last_name : e.data.user.last_name}`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 8000 }); return e })
        .catch((e) => { toast.update(t, { render: `Nie udało się edytować użytkownika \n${e.response.data.name}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 8000 }); return e })
    return response.data
}