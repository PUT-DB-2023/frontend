import { axios } from 'lib/axios'

export const getSemesters = async (active?: boolean) => {
    const response = await axios.get("/semesters/", {
        params: {
            'active': active
        }
    })
    return response.data
}