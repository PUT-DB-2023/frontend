import { axios } from 'lib/axios'

export const getEditions = async (active?: boolean, courseId?: string) => {
    const response = await axios.get("/editions/", {
        params: {
            'course': courseId,
            'semester__active': active,
        }
    }).then((e) => {return e}).catch((e) => {return e})
    return response.data
}