import { axios } from 'lib/axios'
import { Course } from '../types'

export const addCourse = async (course: Course) => {
    const response = await axios.post("/courses", course)
    return response.data
}