import { axios } from 'lib/axios'
import { IAddGroup } from './addGroup';
import { format } from 'date-fns'
import { toast } from 'react-toastify';

interface IUpdate extends IAddGroup {
    id: string;
}

export const updateGroup = async (group: IUpdate) => {
    // const data = {
    //     name: group.name,
    //     day: group.day,
    //     hour: group.hour,
    //     room: group.room,
    //     teacherEdition: group.teacherEdition,
    //     students: group.students,
    //     id: group.id,
    // }
    console.log('group update', group);
    
    const t = toast.loading("Edytowanie..")
    const response = await axios.put(`/groups/${group.id}/`, group)
    .then((e)=>{toast.update(t, {render: "Pomyślnie edytowano grupę", type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    .catch((e)=>{toast.update(t, {render: "Nie udało się edytować grupy", type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    return response
}