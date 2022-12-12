import { axios } from 'lib/axios'
import { format } from 'date-fns'
import { toast } from 'react-toastify';
import { Student } from 'features/users';

export interface IAddStudentsToGroup {
    groupId: string,
    students: Student[],
}

export const addStudents = async ({groupId, students}: IAddStudentsToGroup) => {
    const t = toast.loading("Dodawanie..")
    console.log('group_id', groupId);
    console.log('students', students);
    
    const response = await axios({
        method: 'post',
        url: '/add_students_to_group',
        data: {
            group_id : groupId,
            students : students.map((student: Student) => {
                return student.id
            })
        }
    })
    .then((e)=>{toast.update(t, {render: `Pomyślnie dodano studentów.`, type: "success", theme: "colored", isLoading: false, closeButton: true, autoClose: 8000}); return e})
    .catch((e)=>{toast.update(t, {render: `Nie udało się dodać studentów \n${e.response.data.name}`, type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 8000}); return e})
    console.log(response);
    
    return response
}