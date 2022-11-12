import { axios } from 'lib/axios'
import { Semester } from '../types'
import { ISemester } from './addSemester'

export interface ISem extends ISemester {
    id: string,
}

export const updateSemester = async (semester: ISem) => {
    const response = await axios.patch(`/semesters/${semester.id}/`, semester)
    .then((e)=>{return e})
    .catch((e)=>{return e})
    return response
}