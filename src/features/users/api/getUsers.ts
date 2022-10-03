import { axios } from 'lib/axios'
import { useQuery } from 'react-query'
import { User } from '../types'

export const getUsers = async ( courseId? : any ) => {
    const response = await axios.get("/users/", {
        params : {
            'course': courseId
        }
    })
    return response.data
}