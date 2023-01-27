import { axios } from 'lib/axios'

export const getProviders = async () => {
    const response = await axios.get("/dbms/")
    return response.data
}