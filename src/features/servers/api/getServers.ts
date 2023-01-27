import { axios } from 'lib/axios'

interface IGetServers {
    active?: boolean;
    courseId?: string;
}

export const getServers = async ({ active, courseId }: IGetServers) => {
    const response = await axios.get("/servers/", {
        params: {
            'course': courseId,
            'active': active
        }
    })
    return response.data
}