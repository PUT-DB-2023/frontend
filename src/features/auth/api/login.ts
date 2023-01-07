import { axios } from "lib/axios";
import { toast } from 'react-toastify'

export type Credentials = {
    email: string;
    password: string;
  };
  
  export const login = async (data: Credentials) => { 
    // TMP Toast - będzie informacja o błednym loginie i hasłe w przyszłości
    const t = toast.loading("Logowanie...")   
    const response = await axios.post('/login', data)
    .then((e)=>{toast.update(t, {render: `Pomyślnie zalogowano`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 4000}); return e})
    .catch((e)=>{toast.update(t, {render: `Nie udało się zalogować`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 8000}); return e})  

    console.log(response, t);
    
    return response.data
  };