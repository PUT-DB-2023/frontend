import { axios } from 'lib/axios'

export const getEditionTeachers = async (editionId : string|undefined) => {
    const response = await axios.get(`/teacher_editions/`, {
        params : {
            'edition': editionId
        }
    })
    .then(e => {return e})
    .catch(e => {return e})
    return response.data
}