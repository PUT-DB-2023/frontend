import { axios } from 'lib/axios'
import { Course } from '../types'

interface ICourse {
    id: string,
    name: string,
    description: string,
}

export const updateCourse = async (course: ICourse) => {
    const response = await axios.put(`/courses/${course.id}/`, course)
    .then((e)=>{return e})
    .catch((e)=>{return e})
    console.log(response)
    return response
}