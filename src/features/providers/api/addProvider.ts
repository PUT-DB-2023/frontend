import { displayError } from 'api/displayError'
import { axios } from 'lib/axios'
import { toast } from 'react-toastify'

export const addProvider = async ({ name, description }: { name: string, description: string }) => {
    const t = toast.loading("Dodawanie..")
    const response = await axios.post("/dbms/", { name: name, description: description, servers: {} })
        .then((e) => { toast.update(t, { render: `Pomyślnie dodano dostawcę - ${e.data.name}`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 }); return e })
        .catch((e) => { toast.update(t, { render: `Nie udało się dodać dostawcy - ${displayError(e.response.data)}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 }); return e })
    return response.data
}