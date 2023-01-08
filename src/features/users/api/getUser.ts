import { axios } from 'lib/axios'
import { UserType } from 'types'

export const getUser = async (userId: string|undefined, type? : UserType) => {    
    let response = null
    if (type === UserType.TEACHER) {
        const teacherIdResponse = await axios.get(`/teachers/`, {
            params: {
                user: userId
            }
        })
        console.log(teacherIdResponse);
        
        response = await axios.get(`/teachers/${teacherIdResponse.data?.[0].id}`)
        return response.data
    }
    
    else if (type === UserType.STUDENT) {
        const studentIdResponse = await axios.get(`/students/`, {
            params: {
                user: userId
            }
        })
        console.log(studentIdResponse);
        
        response = await axios.get(`/students/${studentIdResponse.data?.[0].id}`)
        return response.data
    }

    else response = await axios.get(`/users/${userId}`)
    
    return response.data
}