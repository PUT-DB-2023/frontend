import { axios } from 'lib/axios'
import { format } from 'date-fns'

export interface IAddGroup {
    name: string
    day: string,
    hour: string,
    room: string,
    teacherEdition: string;
    students: Array<string>;
}

export const addGroup = async (group: IAddGroup) => {
    // const data = {
    //     description: edition.description,
    //     date_opened: format(edition.date_opened, 'yyyy-MM-dd'),
    //     date_closed: format(edition.date_closed, 'yyyy-MM-dd'),
    //     active: edition.active,
    //     semester: edition.semester,
    //     course: edition.course,
    // }
    const response = await axios.post("/groups/", group)
    return response.data
}