import { axios } from 'lib/axios'
import { toast } from 'react-toastify';

export const addDbAccounts = async (groupId: string, serverId: string) => {
    const t = toast.loading("Przenoszenie kont..")
    const response = await axios({
        method: 'post',
        url: '/move_db_account',
        data: {
            group_id : groupId,
            server_id : serverId
        }
    })
    .then((e)=>{toast.update(t, {render: <div>Pomyślnie utworzono konta bazodanowe.</div>, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000}); return e})
    .catch((e)=>{toast.update(t, {render: <div>Nie udało się utworzyć kont <br/><br/> {e.response.data.name}</div>, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 }); return e})
    return response.data
}