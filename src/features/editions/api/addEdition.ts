import { axios } from 'lib/axios'
import { Edition } from '../types'

export const addEdition = async (edition: Edition) => {
    const response = await axios.post("/editions/", edition)
    return response.data
}