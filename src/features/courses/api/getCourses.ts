import { axios } from 'lib/axios'

export const getCourses = async (active?: boolean) => {
    const response = await axios.get("/courses/", {
        params: {
            'active': active
        }
    })

    return response.data
}