import { axios } from "lib/axios";

export const logout = async () => {

  const response = await axios.post('/logout')
  .then((e)=>{return e})
  .catch((e)=>{return e})    

  return response.data
};