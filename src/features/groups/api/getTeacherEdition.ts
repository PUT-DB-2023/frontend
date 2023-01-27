import { axios } from 'lib/axios'

export const getTeacherEdtition = async (editionId: string | undefined) => {
    const response = await axios.get(`/teacher_editions/`, {
        params: {
            'edition': editionId
        }
    })
    return response.data
}