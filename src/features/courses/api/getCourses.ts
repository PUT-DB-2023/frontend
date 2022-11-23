import { axios } from 'lib/axios'
import { useQuery } from 'react-query'
import { Course } from '../types'

export const getCourses = async (active?: boolean) => {
    const response = await axios.get("/courses/", {
        params : {
            'active': active
        }
    })
    .then(e => {return e})
    .catch(e => {return e})
    return response.data
}

export const useCourses = () => {
    return useQuery({
        queryKey: ['courses'],
        queryFn: () => getCourses(),
    });
};