import { axios } from 'lib/axios'
import { Provider } from 'types'

export const getProviders = async () : Promise<Provider[]> => {
    const response = await axios.get(`/dbms`)
    return response.data
}