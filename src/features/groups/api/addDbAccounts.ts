import { axios } from 'lib/axios'

export const addDbAccounts = async (groupId: any, serverId: any) => {
    const response = await axios.post(`/groups/${groupId}/`)
    return response.data
}