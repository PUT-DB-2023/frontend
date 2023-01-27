import { axios } from 'lib/axios'

export const getMajors = async () => {
    const response = await axios.get("/majors/")
    return response.data
}