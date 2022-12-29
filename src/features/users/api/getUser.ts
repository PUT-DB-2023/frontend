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
        return response.data?.[0]
    }
    
    else if (type === UserType.STUDENT) {
        response = await axios.get(`/students/`, {
            params: {
                user: userId
            }
        })
        return response.data?.[0]
    }

    else response = await axios.get(`/users/${userId}`)
    
    return response.data
}

// export const getUser = async (id: string|undefined, type? : UserType, byUserId?: boolean) => {  // byUserId - if the user is a student or teacher, you can access by nested userId
//     let config = undefined

//     if (byUserId) {
//         config = {
//             params: {
//                 user: id
//             }
//         }
//     }
    
//     let response = null
//     if (type === UserType.TEACHER) response = await axios.get(`/teachers/`, config)
//     else if (type === UserType.STUDENT) response = await axios.get(`/students/`, config)
//     else response = await axios.get(`/users/${id}`)

//     return response.data
// }