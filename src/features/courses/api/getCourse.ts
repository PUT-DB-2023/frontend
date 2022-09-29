import { axios } from 'lib/axios'
import { Course } from '../types'

export const getCourse = async ( { courseId } : { courseId: any } ) => {
    console.log(courseId, typeof courseId)
    const response = await axios.get(`/courses/${courseId}/`)
    return response.data
}