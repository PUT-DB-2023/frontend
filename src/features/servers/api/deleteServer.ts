import { axios } from 'lib/axios'

export const deleteServer = async (id: any) => {
    const response = await axios.delete(`/servers/${ id }`)
    .then((e)=>{return e})
    .catch((e)=>{return e})
    return response
}