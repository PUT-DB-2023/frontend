import { axios } from 'lib/axios'
import { useQuery } from 'react-query'
import { Major } from '../types'

export const getMajors = async () => {
    const response = await axios.get("/majors/")
    // .then(e => {return e})
    // .catch(e => {return e})
    
    return response.data
}