import { axios } from 'lib/axios'

export const getGroup = async (groupId: string|undefined) => {
    const response = await axios.get(`/groups/${groupId}/`)
    return response.data
}