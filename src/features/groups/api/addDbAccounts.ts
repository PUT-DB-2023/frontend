import { axios } from 'lib/axios'

export const addDbAccounts = async (groupId: string, serverId: string) => {
    const response = await axios({
        method: 'post',
        url: '/add_db_account',
        data: {
            group_id : groupId,
            server_id : serverId
        }
    })
    return response.data
}