import { axios } from 'lib/axios'
import { Edition } from '../types'
import { IAddEdition } from './addEdition'
import { format } from 'date-fns'

interface IUpdate extends IAddEdition {
    id: string;
}

export const updateEdition = async (edition: IUpdate) => {
    const data = {
        description: edition.description,
        date_opened: format(edition.date_opened, 'yyyy-MM-dd'),
        date_closed: format(edition.date_closed, 'yyyy-MM-dd'),
        active: edition.active,
        semester: {id: edition.semester},
        course: {id: edition.course},
        id: edition.id,
    }
    const response = await axios.patch(`/editions/${edition.id}`, data)
    .then((e)=>{return e})
    .catch((e)=>{return e})
    return response
}