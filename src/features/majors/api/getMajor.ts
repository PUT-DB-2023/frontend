import { axios } from 'lib/axios'
import { Major } from '../types'

export const getMajor = async (id: string | undefined): Promise<Major> => {
    const response = await axios.get(`/majors/${id}/`)
    return response.data
}