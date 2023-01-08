import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType, UserType, Major } from 'types';
import { updateUserNew, updateUserOld } from '../api/updateUser';
import { OldUser, Student, Teacher, User } from '../types';
import { isStudent, isTeacher } from '../api/checkUserType';
import { getMajors } from '../api/geyMajors';
import { useQuery } from 'react-query'
import { MajorsDropDown } from 'components/MajorsDropDown';
interface IEditModal {
    show: boolean,
    off: () => void,
    refetch: () => void,
    type: UserType
    data: Student | Teacher | User,
}

export const EditModal = ({ show, off, refetch, type, data }: IEditModal) => {
    const { data: majorsData, status: majorsStatus, refetch: majorsRefetch } = useQuery(['majors'], () => getMajors())
    const [first_name, setFirstName] = React.useState((isStudent(data) || isTeacher(data)) ? data?.user?.first_name : data?.first_name);
    const [last_name, setLastName] = React.useState((isStudent(data) || isTeacher(data)) ? data?.user?.last_name : data?.last_name);
    const [email, setEmail] = React.useState((isStudent(data) || isTeacher(data)) ? data?.user?.email : data?.email);
    const [student_id, setStudentId] = React.useState<string | undefined>(isStudent(data) ? data?.student_id : undefined);
    const [major, setMajor] = React.useState<Major | undefined>();
    const defaultMsg = { first_name: '', last_name: '', email: '', student_id: '', major: '' }
    const [errorMsg, setErrorMsg] = React.useState(defaultMsg);

    const validate = React.useCallback(() => {
        let correct = true;
        console.log(student_id?.length);
        

        if (first_name.length === 0) {
            setErrorMsg(prevState => ({ ...prevState, 'first_name': 'Pole wymagane' }));
            correct = false;
        }
        if (last_name.length === 0) {
            setErrorMsg(prevState => ({ ...prevState, 'last_name': 'Pole wymagane' }));
            correct = false;
        }
        if (email.length === 0) {
            setErrorMsg(prevState => ({ ...prevState, 'email': 'Pole wymagane' }));
            correct = false;
        }
        if (type === UserType.STUDENT) {
            if (student_id?.length != 6) {
                setErrorMsg(prevState => ({ ...prevState, 'student_id': 'Indeks musi składać się z 6 znaków' }));
                correct = false;
            }
            if (!student_id) {
                setErrorMsg(prevState => ({ ...prevState, 'student_id': 'Pole wymagane' }));
                correct = false;
            }
        }

        if (!major && type === UserType.STUDENT) {
            setErrorMsg(prevState => ({ ...prevState, 'major': 'Pole wymagane' }));
            correct = false;
        }

        return correct;
    }, [first_name, last_name, email, student_id, major])

    React.useEffect(() => {
        setFirstName((isStudent(data) || isTeacher(data)) ? data?.user?.first_name : data?.first_name);
        setLastName((isStudent(data) || isTeacher(data)) ? data?.user?.last_name : data?.last_name);
        setEmail((isStudent(data) || isTeacher(data)) ? data?.user?.email : data?.email);
        setStudentId(isStudent(data) ? data?.student_id : undefined);

        const currentMajor: Major | undefined = isStudent(data) ? majorsData?.find((e: Major) => e.id === data?.major?.id) : undefined;
        setMajor(currentMajor);

        setErrorMsg(defaultMsg);
    }, [show, data, majorsData])

    const handleEdit = React.useCallback(async () => {
        if (!validate()) { return; }
        // let newUser: User = { first_name, last_name, email, id: (isStudent(data) || isTeacher(data)) ? data.user.id : data.id } as User;
        // let newTeacher: Teacher = (isTeacher(data) ? { id: data.id, user: newUser } : {}) as Teacher;
        // let newStudent: Student = (isStudent(data) ? { id: data.id, user: newUser, student_id: student_id, major: major?.id } : {}) as any;
        // let newData = isTeacher(data) ? newStudent : (isTeacher(data) ? newTeacher : newUser)
        // const res = await updateUserNew(newData, type);
        let oldData: OldUser = {first_name, last_name, email, id: data.id, student_id, major: major?.id } as OldUser
        const res = await updateUserOld(oldData, type);
        if (res) {
            off();
            refetch();
        }
    }, [first_name, last_name, email, student_id, major, type, data.id])

    const name = 'Edytuj ' + (type === UserType.ADMIN ? 'admina' : (type === UserType.TEACHER ? 'nauczyciela' : (type === UserType.STUDENT ? 'studenta' : '')))

    const buttons = <>
        <Button type={ButtonType.TEXT_ACTION} text='Anuluj' onClick={off} />
        <Button type={ButtonType.ACTION} text='Zapisz' onClick={handleEdit} />
    </>

    if (show) {
        return (
            <ModalContainer title={name} off={off} buttons={buttons}>
                <div className={`flex flex-col gap-1`}>
                    <Field title={"Imię"} value={first_name} setValue={setFirstName} autoFocus={true} errorMsg={errorMsg['first_name']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'first_name': e }))} maxLenght={30} />
                    <Field title={"Nazwisko"} value={last_name} setValue={setLastName} errorMsg={errorMsg['last_name']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'last_name': e }))} maxLenght={30} />
                    <Field title={"Email"} value={email} type={'email'} setValue={setEmail} errorMsg={errorMsg['email']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'email': e }))} maxLenght={70} />
                    {type === UserType.STUDENT &&
                        <>
                            <Field title={"Student ID"} value={student_id} type={'number'} setValue={setStudentId} errorMsg={errorMsg['student_id']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'student_id': e }))} maxLenght={6} />
                            {majorsData && <MajorsDropDown title='Kierunek' values={majorsData} value={major} setValue={setMajor} errorMsg={errorMsg['major']} setErrorMsg={(value: string) => setErrorMsg(prevState => ({ ...prevState, 'major': value }))}/>}
                        </>
                    }
                </div>
            </ModalContainer>
        );
    } else {
        return null;
    }
};

EditModal.displayName = 'EditModal';