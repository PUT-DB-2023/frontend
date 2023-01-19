import { displayError } from 'api/displayError';
import { axios } from 'lib/axios'
import { toast } from 'react-toastify';

export const removeDBAccountLocal = async (id: string | undefined) => {
    const t = toast.loading("Usuwanie konta bazodanowego..")
    const response = await axios.delete(`/db_accounts/${id}`)
    .then((e) => { toast.update(t, { render: `Pomyślnie usunięto konto`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 }); return e })
    .catch((e) => { toast.update(t, { render: `Nie udało się usunąć konta - ${displayError(e.response.data)}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 }); return e })
    return response.data
}