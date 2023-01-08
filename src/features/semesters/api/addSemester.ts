import { displayError } from 'api/displayError';
import { Edition } from 'features/editions';
import { axios } from 'lib/axios'
import { toast } from 'react-toastify'

export interface ISemester {
    start_year: string;
    winter: boolean;
    active: boolean;
    editions: Edition[];
}

export const addSemester = async (semester: ISemester) => {
    const t = toast.loading("Dodawanie..")
    const response = await axios.post("/semesters/", semester)
    .then((e)=>{toast.update(t, {render: `Pomyślnie dodano semestr - ${e.data.start_year}/${e.data.start_year+1} - ${e.data.winter ? "Zima" : "Lato"}`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 8000}); return e})
    .catch((e)=>{toast.update(t, {render: `Nie udało się dodać semestru - ${displayError(e.response.data)}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 8000}); return e})
    
    return response.data
}