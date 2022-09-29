import { axios } from 'lib/axios'
import { Edition } from '../types'

export const updateEdition = async (edition: Edition) => {
    const response = await axios.patch(`/editions/${edition.id}`, edition)
    return response.data
}