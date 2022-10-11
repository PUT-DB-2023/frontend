import { axios } from 'lib/axios'
import { Course } from '../types'

export const addCourse = async (course: Course) => {
    console.log(course);
    const response = await axios.post("/courses/", course)
    console.log(response)
    return response.data
}