import { axios } from 'lib/axios'
import { Semester } from '../types'

export const getSemester = async (editionId: string|undefined) => {
    const response = await axios.get(`/semesters/${editionId}/`)
    return response.data
}