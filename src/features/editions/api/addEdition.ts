import { axios } from 'lib/axios'
import { Edition } from '../types'
import { format } from 'date-fns'
import { toast } from 'react-toastify'

export interface IAddEdition {
    description: string,
    date_opened: Date,
    date_closed: Date,
    semester: string,   
    course: string,
    teachers?: any[],
    servers?: any[]
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
    .then((e)=>{toast.update(t, {render: `Pomyślnie dodano edycję - ${e.data.semester.start_year}/${e.data.semester.start_year+1} - ${e.data.semester.winter ? "Zima" : "Lato"}`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    .catch((e)=>{toast.update(t, {render: `Nie udało się dodać edycji \n${e.response.data.name}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 5000}); console.log(e.data); return e})
    return response.data
}