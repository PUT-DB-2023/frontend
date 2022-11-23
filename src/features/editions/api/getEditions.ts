import { axios } from 'lib/axios'
import { useQuery } from 'react-query'
import { Edition } from '../types'

export const getEditions = async (active?: boolean, courseId? : string ) => {
    const response = await axios.get("/editions/", {
        params : {
            'course': courseId,
            'semester__active': active,
        }
    })
    .then(e => {return e})
    .catch(e => {return e})
    console.log('GET EDITIONS', active, courseId, response.data)
    return response.data
}