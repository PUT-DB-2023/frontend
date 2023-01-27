import { axios } from 'lib/axios'
import { Provider } from '../types'

export const getProvider = async (id: string | undefined): Promise<Provider> => {
    const response = await axios.get(`/dbms/${id}/`)
    return response.data
}