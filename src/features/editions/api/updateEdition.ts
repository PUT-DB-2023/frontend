import { axios } from 'lib/axios'
import { Edition } from '../types'
import { IAddEdition } from './addEdition'
import { format } from 'date-fns'
import { toast } from 'react-toastify';

interface IUpdate extends IAddEdition {
    id: string;
    active?: boolean;
}

export const updateEdition = async (edition: IUpdate) => {
    const data = {
        description: edition.description,
        date_opened: format(edition.date_opened, 'yyyy-MM-dd'),
        date_closed: format(edition.date_closed, 'yyyy-MM-dd'),
        semester: edition.semester,
        course: edition.course,
        teachers: edition.teachers?.map(e => e.id),
        servers: edition.servers?.map(e => e.id),
    }

    console.log('data', data);
    

    const t = toast.loading("Edytowanie..")
    const response = await axios.patch(`/editions/${edition.id}/`, data)
    .then((e)=>{toast.update(t, {render: "Pomyślnie edytowano edycję", type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    .catch((e)=>{toast.update(t, {render: "Nie udało się edytować edycji", type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    return response
}