import { axios } from 'lib/axios'

export const addDbAccounts = async (groupId: any, serverId: any) => {
    const response = await axios({
        method: 'post',
        url: '/add_db_account',
        data: {
            groupID : groupId,
            serverID : serverId
        }
    })
    return response.data
}