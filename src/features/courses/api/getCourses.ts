import { axios } from 'lib/axios'
import { useQuery } from 'react-query'
import { Course } from '../types'

export const getCourses = async () => {
    const response = await axios.get("/courses/")
    return response.data
}

export const useCourses = () => {
    return useQuery({
        queryKey: ['courses'],
        queryFn: () => getCourses(),
    });
};