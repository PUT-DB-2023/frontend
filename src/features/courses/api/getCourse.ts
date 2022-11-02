import { axios } from 'lib/axios'
import { Course } from '../types'

export const getCourse = async (courseId: any) => {
    const response = await axios.get(`/courses/${courseId}/`)
    return response.data
}