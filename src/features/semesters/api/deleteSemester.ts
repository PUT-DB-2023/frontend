import { axios } from 'lib/axios'

export const deleteSemester = async (id: any) => {
    const response = await axios.delete(`/semesters/${ id }`)
    .then((e)=>{return e})
    .catch((e)=>{return e})
    return response
}