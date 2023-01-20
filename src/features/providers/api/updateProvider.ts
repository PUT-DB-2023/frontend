import { displayError } from 'api/displayError'
import { axios } from 'lib/axios'
import { toast } from 'react-toastify'
import { Provider } from '../types'

export const updateProvider = async (provider: Provider) => {
    const t = toast.loading("Edytowanie..")
    const response = await axios.patch(`/dbms/${provider.id}/`, provider)
        .then((e) => { toast.update(t, { render: `Pomyślnie edytowano dostawcę - ${e.data.name}`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 }); return e })
        .catch((e) => { toast.update(t, { render: `Nie udało się edytować dostawcy - ${displayError(e.response.data)}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 }); return e })
    return response.data
}