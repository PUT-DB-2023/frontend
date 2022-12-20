import { axios } from "lib/axios";
import { toast } from "react-toastify";

export type Credentials = {
    email: string;
    password: string;
  };
  
  export const login = async (data: Credentials) => {
    console.log(data);
    
    const response = await axios.post('/login', data)
    .then((e)=>{return e})
    .catch((e)=>{return e})    

    return response.data
  };