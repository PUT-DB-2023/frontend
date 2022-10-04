import { axios } from 'lib/axios'
import { useQuery } from 'react-query'
import { Edition } from '../types'

export const getEditionGroups = async ( editionId? : any ) => {
    console.log("getEditions", editionId)
    const response = await axios.get("/groups/", {
        params : {
            'teacherEdition__edition': editionId
        }
    })
    return response.data
}