import { axios } from 'lib/axios'

export const getTeacherEdtition = async (editionId : string|undefined) => {
    console.log('getTeacherEdtition', editionId);
    
    const response = await axios.get(`/teacher_editions/`, {
        params : {
            'edition': editionId
        }
    })
    .then(e => {return e})
    .catch(e => {return e})
    console.log('getTeacherEdtition', response.data);
    
    return response.data
}