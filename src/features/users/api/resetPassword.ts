import { axios } from 'lib/axios'
import { toast } from 'react-toastify';

export const resetPassword = async (userId: string | undefined) => {
    const t = toast.loading("Resetowanie hasła..")
    const response = await axios.post("/reset_system_password", {
        "account_id": userId
    })
    .then((e) => { toast.update(t, { render: `Pomyślnie zresetowano hasło`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 8000 }); return e })
    .catch((e) => { toast.update(t, { render: `Nie udało się zresetować hasła`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 8000 }); return e })
    return response.data
}
