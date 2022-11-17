import { axios } from 'lib/axios'
import { Edition } from '../types'
import { IAddEdition } from './addEdition'
import { format } from 'date-fns'
import { toast } from 'react-toastify';

interface IUpdate extends IAddEdition {
    id: string;
}

export const updateEdition = async (edition: IUpdate) => {
    const data = {
        description: edition.description,
        date_opened: format(edition.date_opened, 'yyyy-MM-dd'),
        date_closed: format(edition.date_closed, 'yyyy-MM-dd'),
        semester: {id: edition.semester},
        course: {id: edition.course},
        id: edition.id,
    }
    const t = toast.loading("Edytowanie..")
    const response = await axios.patch(`/editions/${edition.id}`, data)
    .then((e)=>{toast.update(t, {render: "Pomyślnie edytowano edycję", type: "success", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    .catch((e)=>{toast.update(t, {render: "Nie udało się edytować edycji", type: "error", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    return response
}