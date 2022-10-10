import { axios } from 'lib/axios'
import { useQuery } from 'react-query'
import { Edition } from '../types'

export const getEditions = async ( courseId? : any ) => {
    console.log("getEditions", courseId)
    const response = await axios.get("/editions/", {
        params : {
            'course': courseId
        }
    })
    return response.data
}