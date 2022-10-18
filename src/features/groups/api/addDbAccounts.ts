import { axios } from 'lib/axios'

export const addDbAccounts = async (groupId: any, serverId: any) => {
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