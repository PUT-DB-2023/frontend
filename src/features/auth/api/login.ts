import { axios } from "lib/axios";
import { toast } from "react-toastify";

export type LoginCredentials = {
    username: string;
    password: string;
  };
  
  export const login = async (data: LoginCredentials) => {
    const t = toast.loading("Dodawanie..")
    console.log(data);
    
    const response = await axios.post('/login', data)
    .then((e)=>{toast.update(t, {render: `Pomyślnie zalogowano.`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 5000}); console.log(e.config);
     return e})
    .catch((e)=>{toast.update(t, {render: `Nie udało się zalogować.`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 5000}); return e})    

    console.log(response);
    
    return response.data
  };