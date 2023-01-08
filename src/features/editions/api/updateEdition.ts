import { axios } from 'lib/axios'
import { Edition } from '../types'
import { IAddEdition } from './addEdition'
import { format } from 'date-fns'
import { toast } from 'react-toastify';
import { displayError } from 'api/displayError';

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
    

    const t = toast.loading("Edytowanie..")
    const response = await axios.put(`/editions/${edition.id}/`, data)
    .then((e)=>{toast.update(t, {render: `Pomyślnie edytowano edycję - ${e.data.semester.start_year}/${e.data.semester.start_year+1} - ${e.data.semester.winter ? "Zima" : "Lato"}`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000}); return e})
    .catch((e)=>{toast.update(t, {render: `Nie udało się edytować edycji - ${displayError(e.response.data)}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000}); return e})
    return response.data
}