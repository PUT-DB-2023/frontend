import { axios } from 'lib/axios'
import { Course } from '../types'

export const addCourse = async ({name, description}: {name: string, description: string}) => {
    const response = await axios.post("/courses/", {name: name, description: description})
    .then((e)=>{return e})
    .catch((e)=>{return e})
    return response
}