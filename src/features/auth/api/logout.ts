import { axios } from "lib/axios";
import { toast } from "react-toastify";
import { Credentials } from "./login";

export const logout = async () => {

  const response = await axios.post('/logout')
  .then((e)=>{return e})
  .catch((e)=>{return e})    

  return response.data
};