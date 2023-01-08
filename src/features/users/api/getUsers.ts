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
    .then(e => e)
    .catch(e => e)

    else if (type === UserType.TEACHER) response = await axios.get("/teachers/")
    .then(e => e)
    .catch(e => e)

    else if (type === UserType.STUDENT) response = await axios.get("/students/")
    .then(e => e)
    .catch(e => e)

    if (response != null) return response.data
}