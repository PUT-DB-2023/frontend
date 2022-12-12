import { axios } from 'lib/axios';
import { toast } from 'react-toastify';

export interface IActiveStat {
    id: string,
    active: boolean,
    refresh: any,
}

export const activeServer = async (activeStat: IActiveStat) => {
    const t = toast.loading(activeStat.active ? 'Deaktywowanie serwera..' : 'Aktywowanie serwera..')
    const response = await axios.patch(`/servers/${activeStat.id}/`, {id: activeStat.id, active: !activeStat.active})
    .then((e)=>{
        toast.update(t, {render: activeStat.active ? `Pomyślnie deaktywowano serwer. - ${e.data.name}` : `Pomyślnie aktywowano serwer.. - ${e.data.name}`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 5000})
        activeStat.refresh();
        return e
    })
    .catch((e)=>{toast.update(t, {render: activeStat.active ? `Nie udało się deaktywować serwera. \n${e.response.data.name}` : `Nie udało się aktywować serwera. \n${e.response.data.name}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    return response
}