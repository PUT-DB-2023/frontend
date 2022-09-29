import { axios } from 'lib/axios'
import { Edition } from '../types'

export const getEdition = async ( { editionId } : { editionId: any } ) => {
    console.log(editionId, typeof editionId)
    const response = await axios.get(`/editions/${editionId}/`)
    return response.data
}