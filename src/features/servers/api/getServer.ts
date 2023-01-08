import { axios } from 'lib/axios'
import { Server } from '../types'

export const getServer = async (editionId: string|undefined) : Promise<Server> => {
    const response = await axios.get(`/servers/${editionId}/`)
    // .then(e => {return e})
    // .catch(e => {return e})
    return response.data
}