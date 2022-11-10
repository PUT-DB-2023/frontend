import { axios } from 'lib/axios'
import { Edition } from '../types'
import { format } from 'date-fns'

export interface IAddEdition {
    description: string,
    date_opened: Date,
    date_closed: Date,
    semester: string,
    course: string,
}

export const addEdition = async (edition: IAddEdition) => {
    const data = {
        description: edition.description,
        date_opened: format(edition.date_opened, 'yyyy-MM-dd'),
        date_closed: format(edition.date_closed, 'yyyy-MM-dd'),
        semester: edition.semester,
        course: edition.course,
    }
    const response = await axios.post("/editions/", data)
    return response.data
}