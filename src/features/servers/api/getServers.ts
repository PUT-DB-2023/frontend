import { axios } from 'lib/axios'
import { useQuery } from 'react-query'
import { Server } from '../types'

export const getServers = async ( active?: boolean, courseId? : string ) => {
    const response = await axios.get("/servers/", {
        params : {
            'course': courseId,
            'active': active
        }
    })
    return response.data
}