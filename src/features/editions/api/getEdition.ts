import { axios } from 'lib/axios'
import { Edition } from '../types'

export const getEdition = async (editionId: any) => {
    const response = await axios.get(`/editions/${editionId}/`)
    return response.data
}