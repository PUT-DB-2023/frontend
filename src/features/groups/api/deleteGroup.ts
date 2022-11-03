import { axios } from 'lib/axios'

export const deleteGroup = async (id: any) => {
    const response = await axios.delete(`/groups/${ id }`)
    .then((e)=>{return e})
    .catch((e)=>{return e})
    return response
}