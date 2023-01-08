import { axios } from 'lib/axios'

export const getTeachers = async () => {
    const response = await axios.get(`/teachers`)
    // .then(e => {return e})
    // .catch(e => {return e})
    return response.data
}