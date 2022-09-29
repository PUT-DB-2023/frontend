import { axios } from 'lib/axios'
import { useQuery } from 'react-query'
import { Edition } from '../types'

export const getEditions = async () => {
    const response = await axios.get("/editions/")
    return response.data
}

export const useEditions = () => {
    return useQuery({
        queryKey: ['editions'],
        queryFn: () => getEditions(),
    });
};