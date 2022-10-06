import { axios } from 'lib/axios'

export const getGroup = async (groupId: any) => {
    const response = await axios.get(`/groups/${groupId}/`)
    return response.data
}