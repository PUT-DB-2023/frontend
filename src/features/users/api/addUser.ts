import { displayError } from 'api/displayError'
import { axios } from 'lib/axios'
import { toast } from 'react-toastify'
import { UserType } from 'types'
import { OldUser, Student, Teacher, User } from '../types'

export const addUser = async (user: User) => {
    const response = await axios.post("/users/", user)
    return response.data
}

export const addUserOld = async (user: OldUser, type: UserType) => {
    const t = toast.loading("Dodawanie..")
    const dest = (type === UserType.TEACHER ? "/teachers/" : (type === UserType.ADMIN ? "/users/" : (type === UserType.STUDENT ? "/students/" : "")))
    const response = await axios.post(dest, user)
        .then((e) => { toast.update(t, { render: `Pomyślnie dodano użytkownika`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 }); return e })
        .catch((e) => { toast.update(t, { render: `Nie udało się dodać użytkownika - ${displayError(e.response.data)}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 }); return e })

    return response.data
}

export const addUserNew = async (data: Student | Teacher | User, type: UserType) => {
    const t = toast.loading("Dodawanie..")
    const dest = (type === UserType.TEACHER ? "/teachers/" : (type === UserType.ADMIN ? "/users/" : (type === UserType.STUDENT ? "/students/" : "")))
    const response = await axios.post(dest, data)
        .then((e) => { toast.update(t, { render: `Pomyślnie dodano użytkownika - ${type === UserType.ADMIN ? e.data.first_name : e.data.user.first_name} ${type === UserType.ADMIN ? e.data.last_name : e.data.user.last_name}`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 }); return e })
        .catch((e) => { toast.update(t, { render: `Nie udało się dodać użytkownika - ${displayError(e.response.data)}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 }); return e })
    return response.data
}