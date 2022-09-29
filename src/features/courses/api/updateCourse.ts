import { axios } from 'lib/axios'
import { Course } from '../types'

export const updateCourse = async (course: Course) => {
    const response = await axios.patch(`/courses/${course.id}`, course)
    return response.data
}