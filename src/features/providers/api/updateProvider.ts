import { displayError } from 'api/displayError'
import { axios } from 'lib/axios'
import { toast } from 'react-toastify'
import { Provider } from '../types'

export const updateProvider = async (provider: Provider) => {
    const t = toast.loading("Edytowanie..")
    const response = await axios.patch(`/providers/${provider.id}/`, provider)
    .then((e)=>{toast.update(t, {render: `Pomyślnie edytowano kierunek - ${e.data.name}`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000}); return e})
    .catch((e)=>{toast.update(t, {render: `Nie udało się edytować kierunku - ${displayError(e.response.data)}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000}); return e})
    return response.data
}