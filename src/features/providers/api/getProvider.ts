import { axios } from 'lib/axios'
import { Provider } from '../types'

export const getProvider = async (id: string|undefined) : Promise<Provider> => {
    const response = await axios.get(`/providers/${id}/`)
    // .then(e => {return e})
    // .catch(e => {return e})
    return response.data
}