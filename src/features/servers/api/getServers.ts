import { axios } from 'lib/axios'
import { useQuery } from 'react-query'
import { Server } from '../types'

export const getServers = async ( courseId? : any ) => {
    const response = await axios.get("/servers/", {
        params : {
            'course': courseId
        }
    })
    return response.data
}