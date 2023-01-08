import { axios } from 'lib/axios'
import { useQuery } from 'react-query'
import { Semester } from '../types'

export const getSemesters = async ( active? : boolean ) => {
    const response = await axios.get("/semesters/", {
        params : {
            'active': active
        }
    })
    // .then(e => {return e})
    // .catch(e => {return e})    
    return response.data
}