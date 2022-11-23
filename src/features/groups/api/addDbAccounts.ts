import { axios } from 'lib/axios'
import { toast } from 'react-toastify';

export const addDbAccounts = async (groupId: string, serverId: string) => {
    const t = toast.loading("Przenoszenie kont..")
    const response = await axios({
        method: 'post',
        url: '/add_db_account',
        data: {
            group_id : groupId,
            server_id : serverId
        }
    })
    .then((e)=>{toast.update(t, {render: "Pomyślnie przeniesiono konta", type: "success", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    .catch((e)=>{toast.update(t, {render: "Nie udało się przenieść kont", type: "error", isLoading: false, closeButton: true, autoClose: 5000}); return e})
    return response.data
}