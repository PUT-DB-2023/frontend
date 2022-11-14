import { axios } from 'lib/axios'

export const deleteServer = async (id: string|undefined) => {
    const response = await axios.delete(`/servers/${ id }`)
    .then((e)=>{return e})
    .catch((e)=>{return e})
    return response
}