import { axios } from 'lib/axios'

export const deleteGroup = async (id: string|undefined) => {
    const response = await axios.delete(`/groups/${ id }`)
    .then((e)=>{return e})
    .catch((e)=>{return e})
    return response
}