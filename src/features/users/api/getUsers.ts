import { axios } from 'lib/axios'
import { useQuery } from 'react-query'
import { UserType } from 'types'
import { User } from '../types'

export const getUsers = async ( type : UserType ) => {

    console.log(type)

    let response = null
    if (type === UserType.ADMIN) response = await axios.get("/admins/")
    else if (type === UserType.TEACHER) response = await axios.get("/teachers/")
    else if (type === UserType.STUDENT) response = await axios.get("/students/")

    if (response != null) return response.data
}