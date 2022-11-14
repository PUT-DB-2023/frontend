import { axios } from 'lib/axios'

export const deleteEdition = async (id: string|undefined) => {
    const response = await axios.delete(`/editions/${ id }`)
    .then((e)=>{return e})
    .catch((e)=>{return e})
    return response
}