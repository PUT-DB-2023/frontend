import { axios } from 'lib/axios'

export const getTeachers = async () => {
    const response = await axios.get(`/users/teachers`)
    return response.data
}