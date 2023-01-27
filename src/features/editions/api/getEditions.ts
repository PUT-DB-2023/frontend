import { axios } from 'lib/axios'

export const getEditions = async (active?: boolean, courseId?: string) => {
    const response = await axios.get("/editions/", {
        params: {
            'course': courseId,
            'semester__active': active,
        }
    })
    return response.data
}