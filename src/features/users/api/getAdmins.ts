import { axios } from 'lib/axios'

export const getAdmins = async () => {
    const response = await axios.get(`/admins`)
    return response.data
}