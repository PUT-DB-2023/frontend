import { axios } from 'lib/axios'
import { format } from 'date-fns'
import { toast } from 'react-toastify';

export interface IAddGroup {
    name: string
    day: string,
    hour: string,
    room: string,
    teacherEdition: string;
    students?: Array<string>;
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
    const t = toast.loading("Dodawanie..")
    const response = await axios.post("/groups/", group)
    .then((e)=>{toast.update(t, {render: "Pomyślnie dodano grupę", type: "success", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    .catch((e)=>{toast.update(t, {render: "Nie udało się dodać grupy", type: "error", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    return response.data
}