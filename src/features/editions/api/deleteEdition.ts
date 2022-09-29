import { axios } from 'lib/axios'
import { Edition } from '../types'

export const deleteEdition = async ({ id } : any) => {
    const response = await axios.delete(`/editions/${ id }`, id)
    return response.data
}