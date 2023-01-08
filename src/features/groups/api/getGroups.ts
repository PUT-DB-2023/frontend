import { axios } from 'lib/axios'

export const getGroups = async () => {
    const response = await axios.get(`/groups/`)
    // .then(e => {return e})
    // .catch(e => {return e})
    return response.data
}