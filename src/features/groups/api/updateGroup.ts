import { axios } from 'lib/axios'
import { IAddGroup } from './addGroup';
import { format } from 'date-fns'

interface IUpdate extends IAddGroup {
    id: string;
}

export const updateGroup = async (group: IUpdate) => {
    const data = {
        name: group.name,
        day: group.day,
        hour: group.hour,
        room: group.room,
        teacherEdition: group.teacherEdition,
        students: group.students,
        id: group.id,
    }
    const response = await axios.put(`/groups/${group.id}`, data)
    .then((e)=>{return e})
    .catch((e)=>{return e})
    return response
}