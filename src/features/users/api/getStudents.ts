import { axios } from 'lib/axios'

export const getStudents = async () => {
    const response = await axios.get(`/students/`)
    return response.data
}