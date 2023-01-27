import { Provider } from 'features/providers'
import { axios } from 'lib/axios'

export const getProviders = async (): Promise<Provider[]> => {
    const response = await axios.get(`/dbms`)
    return response.data
}