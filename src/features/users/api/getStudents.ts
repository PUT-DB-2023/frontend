import { axios } from 'lib/axios'
import { User } from '../types'

export const getStudents = async () => {
    const response = await axios.get(`/students/`)
    return response.data
}