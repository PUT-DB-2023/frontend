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
    const t = toast.loading("Dodawanie..")
    const response = await axios.post("/groups/", group)
    .then((e)=>{toast.update(t, {render: "Pomyślnie dodano grupę", type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    .catch((e)=>{toast.update(t, {render: "Nie udało się dodać grupy", type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    return response.data
}