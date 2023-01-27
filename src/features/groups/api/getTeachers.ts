import { axios } from 'lib/axios'

export const getTeachers = async () => {
    const response = await axios.get(`/teachers`)
    return response.data
}