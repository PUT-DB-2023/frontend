import { axios } from 'lib/axios';

export interface IActiveStat {
    id: string,
    active: boolean,
    refresh: any,
}

export const activeServer = async (activeStat: IActiveStat) => {
    const response = await axios.patch(`/servers/${activeStat.id}/`, {id: activeStat.id, active: activeStat.active})
    .then((e)=>{
        activeStat.refresh();
        return e
    })
    .catch((e)=>{return e})
    return response
}