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
    .then((e)=>{toast.update(t, {render: `Pomyślnie dodano semestr - ${e.data.name}`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    .catch((e)=>{toast.update(t, {render: `Nie udało się dodać semestru \n${e.response.data.name}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    
    return response
}