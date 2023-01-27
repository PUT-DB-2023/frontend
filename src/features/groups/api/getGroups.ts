import { axios } from 'lib/axios'

export const getGroups = async () => {
    const response = await axios.get(`/groups/`)
    return response.data
}