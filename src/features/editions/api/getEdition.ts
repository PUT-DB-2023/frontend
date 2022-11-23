import { axios } from 'lib/axios'
import { Edition } from '../types'

export const getEdition = async (editionId: string|undefined) => {
    const response = await axios.get(`/editions/${editionId}/`)
    .then(e => {return e})
    .catch(e => {return e})
    return response.data
}