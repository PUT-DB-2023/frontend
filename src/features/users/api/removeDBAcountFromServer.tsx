import { displayError } from 'api/displayError';
import { axios } from 'lib/axios'
import { toast } from 'react-toastify';

export const removeDBAccountFromServer = async (id: string | undefined) => {
    const t = toast.loading("Usuwanie konta bazodanowego z serwera..")
    const response = await axios.post("/delete_db_account", {
        "dbaccount_id": id
    })
        .then((e) => { toast.update(t, { render: `Pomyślnie usunięto konto z serwera`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 }); return e })
        .catch((e) => { toast.update(t, { render: `Nie udało się usunąć konta z serwera - ${displayError(e.response.data)}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 }); return e })
    return response.data
}