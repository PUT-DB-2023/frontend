import { displayError } from 'api/displayError';
import { axios } from 'lib/axios'
import { toast } from 'react-toastify';
import { UserType } from 'types';

export const resetPassword = async (userId: string | undefined, userType: UserType, owner: boolean = false) => {
    console.log(owner);
    const endpoint = owner ? "/reset_own_password" : 
                     userType === UserType.TEACHER ? "/reset_teacher_password" :
                     userType === UserType.STUDENT ? "/reset_student_password" : ""
                         
    const t = toast.loading("Resetowanie hasła..")
    const response = await axios.post(endpoint, {
        "account_id": userId
    })
    .then((e) => { toast.update(t, { render: `Pomyślnie zresetowano hasło`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 }); return e })
    .catch((e) => { toast.update(t, { render: `Nie udało się zresetować hasła - ${displayError(e.response.data)}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 }); return e })
    return response.data
}
