import { displayError } from "api/displayError";
import { axios } from "lib/axios";
import { toast } from 'react-toastify'

export type Credentials = {
  email: string;
  password: string;
};

export const login = async (data: Credentials) => {
  const t = toast.loading("Logowanie...")
  const response = await axios.post('/login', data)
    .then((e) => { toast.update(t, { render: `Pomyślnie zalogowano`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 }); return e })
    .catch((e) => { toast.update(t, { render: `Nie udało się zalogować - ${displayError(e.response.data)}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 }); return e })

  return response.data
};