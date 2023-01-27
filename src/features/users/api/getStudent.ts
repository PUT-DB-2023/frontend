import { axios } from 'lib/axios'
import { Student } from '../types'

export const getStudent = async (id: string): Promise<Student> => {
    const response = await axios.get(`/users/students/${id}/`)
    return response.data
}