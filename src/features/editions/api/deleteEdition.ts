import { displayError } from 'api/displayError';
import { axios } from 'lib/axios'
import { toast } from 'react-toastify';

export const deleteEdition = async (id: string|undefined) => {
    const t = toast.loading("Usuwanie..")
    const response = await axios.delete(`/editions/${ id }`)
    .then((e)=>{toast.update(t, {render: `Pomyślnie usunięto edycję`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000}); return e})
    .catch((e)=>{toast.update(t, {render: `Nie udało się usunąć edycji - ${displayError(e.response.data)}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000}); return e})
    return response
}