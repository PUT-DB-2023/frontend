import { axios } from 'lib/axios'

export const getCourse = async (courseId: string | undefined) => {
    const response = await axios.get(`/courses/${courseId}/`)
    return response.data
}