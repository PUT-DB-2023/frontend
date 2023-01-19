import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType, UserType } from 'types';
import { addUserNew, addUserOld } from '../api/addUser';
import { OldUser, Student, Teacher, User } from '../types';
import { useQuery } from 'react-query'
import { MajorsDropDown } from 'components/MajorsDropDown';
import { Major } from 'features/majors';
import { getMajors } from 'features/majors/api/getMajors';

export const AddNewModal = ({ show, off, refetch, type }: { show: boolean, off: () => void, refetch: () => void, type: UserType }) => {
    const { data: majorsData, status: majorsStatus, refetch: majorsRefetch } = useQuery(['majors'], () => getMajors())
    const [first_name, setFirstName] = React.useState('');
    const [last_name, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [student_id, setStudentId] = React.useState('');
    const [major, setMajor] = React.useState<Major | undefined>(majorsData?.[0])
    const defaultMsg = { first_name: '', last_name: '', email: '', student_id: '', major: '' }
    const [errorMsg, setErrorMsg] = React.useState(defaultMsg);

    React.useEffect(() => {
        setMajor(majorsData?.[0])
    },  [majorsData])

    const validate = React.useCallback(() => {
        let correct = true;

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

    const handleOff = React.useCallback(() => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setStudentId('');
        setMajor(majorsData?.[0]);
        setErrorMsg(defaultMsg);
        off();
    }, [])

    const handleAdd = React.useCallback(async () => {
        if (!validate()) { return; }
        // let addUser: User = {first_name, last_name, email} as User;
        // let addTeacher: Teacher = {user: addUser} as Teacher;
        // let addStudent: Student = (type === UserType.STUDENT ? { user: addUser, student_id: student_id, major: major?.id } : {}) as any;
        // let addData = type === UserType.STUDENT ? addStudent : (type === UserType.TEACHER ? addTeacher : addUser)
        // const res = await addUserNew(addData, type)
        let data: OldUser = { first_name, last_name, email, student_id, major: major?.id } as OldUser;
        const res = await addUserOld(data, type);
        if (res) {
            handleOff();
            refetch();
        }
    }, [first_name, last_name, email, student_id, major, type])

    const name = 'Dodaj ' + (type === UserType.ADMIN ? 'admina' : (type === UserType.TEACHER ? 'nauczyciela' : (type === UserType.STUDENT ? 'studenta' : '')))

    const buttons = <>
        <Button type={ButtonType.TEXT_ACTION} text='Anuluj' onClick={handleOff} />
        <Button type={ButtonType.ACTION} text='Dodaj' onClick={handleAdd} />
    </>

    if (show) {
        return (
            <ModalContainer title={name} off={handleOff} buttons={buttons}>
                <div className={`flex flex-col gap-1`}>
                    <Field title={"Imię"} value={first_name} setValue={setFirstName} autoFocus={true} errorMsg={errorMsg['first_name']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'first_name': e }))} maxLenght={30} />
                    <Field title={"Nazwisko"} value={last_name} setValue={setLastName} errorMsg={errorMsg['last_name']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'last_name': e }))} maxLenght={30} />
                    <Field title={"Email"} value={email} type={'email'} setValue={setEmail} errorMsg={errorMsg['email']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'email': e }))} maxLenght={70} />
                    {type === UserType.STUDENT &&
                        <>
                            <Field title={"Nr albumu"} value={student_id} type={'number'} setValue={setStudentId} errorMsg={errorMsg['student_id']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'student_id': e }))} maxLenght={6} />
                            {majorsData && <MajorsDropDown title='Kierunek' values={majorsData} value={major} setValue={setMajor} />}
                        </>
                    }
                </div>
            </ModalContainer>
        );
    } else {
        return null;
    }
};

AddNewModal.displayName = 'AddNewModal';