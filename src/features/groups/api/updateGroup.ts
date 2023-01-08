import { axios } from 'lib/axios'
import { IAddGroup } from './addGroup';
import { format } from 'date-fns'
import { toast } from 'react-toastify';
import { displayError } from 'api/displayError';

interface IUpdate extends IAddGroup {
    id: string;
}

export const updateGroup = async (group: IUpdate) => {    
    const t = toast.loading("Edytowanie..")
    const response = await axios.put(`/groups/${group.id}/`, group)
    .then((e)=>{toast.update(t, {render: `Pomyślnie edytowano grupę - ${e.data.name}`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000}); return e})
    .catch((e)=>{toast.update(t, {render: `Nie udało się edytować grupy - ${displayError(e.response.data)}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000}); return e})
    return response.data
}