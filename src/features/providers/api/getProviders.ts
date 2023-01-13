import { axios } from 'lib/axios'

export const getProviders = async () => {
    const response = await axios.get("/dbms/")
    // .then(e => {return e})
    // .catch(e => {return e})
    
    return response.data
}