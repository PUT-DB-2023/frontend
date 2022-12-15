import { axios } from "lib/axios";
import { toast } from "react-toastify";

export type LoginCredentials = {
    username: string;
    password: string;
  };
  
  export const login = async (data: LoginCredentials) => {
    console.log(data);
    
    const response = await axios.post('/login', data)
    .then((e)=>{return e})
    .catch((e)=>{return e})    

    return response.data
  };