import { axios } from 'lib/axios'
import { Semester } from '../types'

export const activateSemester = async (semesterId: string|undefined) => {
    console.log('ACTIVATE API');
    
    const response = await axios.post(`/change_active_semester`, {
        'semester_id': semesterId  
    })
    .then(e => {return e})
    .catch(e => {return e})
    return response.data
}