import { displayError } from 'api/displayError';
import { axios } from 'lib/axios'
import { toast } from 'react-toastify';

export const removeStudentsWithoutGroups = async () => {
    const t = toast.loading("Usuwanie nieaktywnych studentów")
    const response = await axios.post("/delete_students_without_groups")
        .then((e) => { toast.update(t, { render: `Pomyślnie usunięto nieaktywnych studentów`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 }); return e })
        .catch((e) => { toast.update(t, { render: `Nie udało się usunąć nieaktywnych studentów - ${displayError(e.response.data)}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 }); return e })
    return response.data
}