import { axios } from 'lib/axios'

export const getGroup = async (groupId: string|undefined) => {
    const response = await axios.get(`/groups/${groupId}/`)
    .then(e => {return e})
    .catch(e => {return e})
    return response.data
}