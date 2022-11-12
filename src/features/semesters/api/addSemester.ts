import { axios } from 'lib/axios'

export interface ISemester {
    name: string,
    ip: string,
    port: string,
    provider: string,
    user: string,
    password: string,
    database: string,
    active: boolean,
}

export const addSemester = async (semester: ISemester) => {
    const response = await axios.post("/semesters/", semester)
    .then((e)=>{return e})
    .catch((e)=>{return e})
    return response
}