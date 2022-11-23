import { axios } from 'lib/axios'
import { toast } from 'react-toastify'

export const addCourse = async ({name, description}: {name: string, description: string}) => {
    const t = toast.loading("Dodawanie..")
    const response = await axios.post("/courses/", {name: name, description: description})
    .then((e)=>{toast.update(t, {render: "Pomyślnie dodano przedmiot", type: "success", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    .catch((e)=>{toast.update(t, {render: "Nie udało się dodać przedmiotu", type: "error", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    return response
}