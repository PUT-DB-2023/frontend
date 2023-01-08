import { axios } from "lib/axios";
import { toast } from 'react-toastify'
import { displayError } from "api/displayError";

export const logout = async () => {

  const t = toast.loading("Wylogowywanie...")   
  const response = await axios.post('/logout')
  .then((e)=>{toast.update(t, {render: `Pomyślnie wylogowano`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 4000, position: 'bottom-right'}); return e})
  .catch((e)=>{toast.update(t, {render: `Nie udało się wylogować - ${displayError(e.response.data)} - ${displayError(e.response.data)}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 8000, position: 'bottom-right'}); return e})  

  return response.data
};