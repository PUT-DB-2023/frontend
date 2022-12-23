import { axios } from 'lib/axios'
import { useQuery } from 'react-query'
import { UserType } from 'types'
import { User } from '../types'

export const getUsers = async (type? : UserType) => {
    let response = null
    if (type === UserType.ADMIN) response = await axios.get("/users/", {
        params : {
            'is_superuser': true
        }
    })
    else if (type === UserType.TEACHER) response = await axios.get("/teachers/")
    else if (type === UserType.STUDENT) response = await axios.get("/students/")

    if (response != null) return response.data
}