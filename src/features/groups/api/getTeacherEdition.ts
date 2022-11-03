import { axios } from 'lib/axios'

export const getTeacherEdition = async () => {
    const response = await axios.get(`/teacher_editions`)
    return response.data
}