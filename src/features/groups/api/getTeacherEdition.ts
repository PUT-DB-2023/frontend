import { axios } from 'lib/axios'

export const getTeacherEdition = async () => {
    const response = await axios.get(`/teacher_editions`)
    .then(e => {return e})
    .catch(e => {return e})
    return response.data
}