import { axios } from 'lib/axios'
import { UserType } from 'types'

export const getUser = async (userId: string|undefined, type? : UserType) => {    
    let response = null
    if (type === UserType.TEACHER) {
        response = await axios.get(`/teachers/`, {
            params: {
                user: userId
            }
        })
        .then(e => e)
        .catch(e => e)
        return response.data?.[0]
    }
    
    else if (type === UserType.STUDENT) {
        response = await axios.get(`/students/`, {
            params: {
                user: userId
            }
        })
        .then(e => e)
        .catch(e => e)
        return response.data?.[0]
    }

    else response = await axios.get(`/users/${userId}`)
    .then(e => e)
    .catch(e => e)
    
    return response.data
}