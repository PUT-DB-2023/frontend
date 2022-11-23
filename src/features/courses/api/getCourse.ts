import { axios } from 'lib/axios'
import { Course } from '../types'

export const getCourse = async (courseId: string|undefined) => {
    const response = await axios.get(`/courses/${courseId}/`)
    .then(e => {return e})
    .catch(e => {return e})
    return response.data
}