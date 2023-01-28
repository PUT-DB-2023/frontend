import { axios } from 'lib/axios'

export const getEditionGroups = async (editionId?: string) => {
    const response = await axios.get("/groups/", {
        params: {
            'teacherEdition__edition': editionId
        }
    }).then((e) => {return e}).catch((e) => {return e})
    return response.data
}