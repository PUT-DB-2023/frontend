import { axios } from 'lib/axios'
import { useQuery } from 'react-query'
import { Server } from '../types'

interface IGetServers {
    active?: boolean;
    courseId?: string;
}

export const getServers = async ({active, courseId} : IGetServers) => {
    const response = await axios.get("/servers/", {
        params : {
            'course': courseId,
            'active': active
        }
    })
    .then(e => {return e})
    .catch(e => {return e})
    return response.data
}