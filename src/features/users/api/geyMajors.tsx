import { axios } from 'lib/axios'
import { Major } from 'types'

export const getMajors = async () : Promise<Major[]> => {
    const response = await axios.get(`/majors`)
    return response.data
}