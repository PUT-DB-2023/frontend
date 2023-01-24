import { displayError } from 'api/displayError'
import { axios } from 'lib/axios'
import { toast } from 'react-toastify'

export const addCourse = async ({name, description, major}: {name: string, description: string, major?: string}) => {
    const t = toast.loading("Dodawanie..")
    const response = await axios.post("/courses/", {name: name, description: description, major: major})
    .then((e)=>{toast.update(t, {render: `Pomyślnie dodano przedmiot - ${e.data.name}`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000}); return e})
    .catch((e)=>{toast.update(t, {render: `Nie udało się dodać przedmiotu - ${displayError(e.response.data)} - ${displayError(e.response.data)}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000}); return e})
    return response.data
}