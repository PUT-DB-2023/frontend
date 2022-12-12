import { axios } from 'lib/axios'
import { toast } from 'react-toastify'

export const addCourse = async ({name, description}: {name: string, description: string}) => {
    const t = toast.loading("Dodawanie..")
    const response = await axios.post("/courses/", {name: name, description: description})
    .then((e)=>{toast.update(t, {render: `Pomyślnie dodano przedmiot - ${e.data.name}`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 8000}); return e})
    .catch((e)=>{toast.update(t, {render: `Nie udało się dodać przedmiotu \n${e.response.data.name}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 8000}); return e})
    return response
}