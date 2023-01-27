import { axios } from 'lib/axios'

export const getEdition = async (editionId: string | undefined) => {
    const response = await axios.get(`/editions/${editionId}/`)
    return response.data
}