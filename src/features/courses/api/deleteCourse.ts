import { axios } from 'lib/axios'
import { Course } from '../types'

export const deleteCourse = async (id: any) => {
    const response = await axios.delete(`/courses/${ id }`)
    .then((e)=>{return e})
    .catch((e)=>{return e})
    return response
}