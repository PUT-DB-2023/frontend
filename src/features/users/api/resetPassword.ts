import { displayError } from 'api/displayError';
import { axios } from 'lib/axios'
import { toast } from 'react-toastify';

export const resetPassword = async (userId: string | undefined, owner: boolean = false) => {
    console.log(owner);
    
    const t = toast.loading("Resetowanie hasła..")
    const response = await axios.post(owner ? "/reset_own_password" : "/reset_student_password", {
        "account_id": userId
    })
    .then((e) => { toast.update(t, { render: `Pomyślnie zresetowano hasło`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 }); return e })
    .catch((e) => { toast.update(t, { render: `Nie udało się zresetować hasła - ${displayError(e.response.data)}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 }); return e })
    return response.data
}
