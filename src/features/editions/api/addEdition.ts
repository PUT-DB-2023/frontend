import { displayError } from 'api/displayError'
import { format } from 'date-fns'
import { Server } from 'features/servers'
import { axios } from 'lib/axios'
import { toast } from 'react-toastify'

export interface IAddEdition {
    description: string,
    date_opened: Date,
    date_closed: Date,
    semester: string,   
    course: string,
    teachers?: any[],
    servers?: Server[]
}

export const addEdition = async (edition: IAddEdition) => {
    const data = {
        description: edition.description,
        date_opened: edition.date_opened && format(edition.date_opened, 'yyyy-MM-dd'),
        date_closed: edition.date_closed && format(edition.date_closed, 'yyyy-MM-dd'),
        semester: edition.semester,
        course: edition.course,
        teachers: edition.teachers?.map(e => e.id),
        servers: edition.servers?.map(e => e.id),
    }    

    const t = toast.loading("Dodawanie..")
    const response = await axios.post("/editions/", data)
    .then((e)=>{toast.update(t, {render: `Pomyślnie dodano edycję - ${e.data.semester.start_year}/${e.data.semester.start_year+1} - ${e.data.semester.winter ? "Zima" : "Lato"}`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000}); return e})
    .catch((e)=>{toast.update(t, {render: `Nie udało się dodać edycji - ${displayError(e.response.data)}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000}); return e})
    return response.data
}