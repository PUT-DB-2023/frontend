import { axios } from 'lib/axios'
import { Server } from '../types'

export const deleteServer = async ({ id } : any) => {
    const response = await axios.delete(`/servers/${ id }`, id)
    return response.data
}