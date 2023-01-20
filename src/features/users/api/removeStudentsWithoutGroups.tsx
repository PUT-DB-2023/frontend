import { displayError } from 'api/displayError';
import { axios } from 'lib/axios'
import { toast } from 'react-toastify';

export const removeStudentsWithoutGroups = async () => {
    const t = toast.loading("Usuwanie użytkowników z serwera")
    const response = await axios.post("/delete_students_without_groups")
        .then((e) => { toast.update(t, { render: `Pomyślnie usunięto użytkowników z serwera`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 }); return e })
        .catch((e) => { toast.update(t, { render: `Nie udało się usunąć użytkowników z serwera - ${displayError(e.response.data)}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 }); return e })
    return response.data
}