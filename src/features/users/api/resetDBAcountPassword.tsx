import { displayError } from 'api/displayError';
import { axios } from 'lib/axios'
import { toast } from 'react-toastify';

export const resetDBAccountPassword = async (id: string | undefined) => {
    const t = toast.loading("Resetowanie hasła do bazy danych..")
    const response = await axios.post("/reset_db_password", {
        "dbaccount_id": id
    })
    .then((e) => { toast.update(t, { render: `Pomyślnie zresetowano hasło`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 }); return e })
    .catch((e) => { toast.update(t, { render: `Nie udało się zresetować hasła - ${displayError(e.response.data)}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 }); return e })
    return response.data
    return false;
}