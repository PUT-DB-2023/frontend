import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType, UserType } from 'types';
import { updateUserOld } from '../api/updateUser';
import { OldUser, Student, Teacher, User } from '../types';
import { isStudent, isTeacher, isStudentOrTeacher } from '../api/checkUserType';
import { useQuery } from 'react-query'
import { MajorsDropDown } from 'components/MajorsDropDown';
import AuthContext from 'context/AuthContext'
import { Major } from 'features/majors';
import { getMajors } from 'features/majors/api/getMajors';
import { objectMap } from 'api/objectMap';

interface IEditModal {
    show: boolean,
    off: () => void,
    refetch: () => void,
    type: UserType
    data: Student | Teacher | User,
}

export const EditModal = ({ show, off, refetch, type, data }: IEditModal) => {
    const { data: majorsData, status: majorsStatus, refetch: majorsRefetch } = useQuery(['majors'], () => getMajors())
    const [first_name, setFirstName] = React.useState(isStudentOrTeacher(data) ? data?.user?.first_name : data?.first_name);
    const [last_name, setLastName] = React.useState(isStudentOrTeacher(data) ? data?.user?.last_name : data?.last_name);
    const [email, setEmail] = React.useState(isStudentOrTeacher(data) ? data?.user?.email : data?.email);
    const [student_id, setStudentId] = React.useState<string | undefined>(isStudent(data) ? data?.student_id : undefined);
    const [major, setMajor] = React.useState<Major>();
    const defaultMsg = { first_name: '', last_name: '', email: '', student_id: '', major: '' }
    const [errorMsg, setErrorMsg] = React.useState(defaultMsg);

    const { authUser, setAuthUser } = React.useContext(AuthContext)

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

        let sum = 0;
        objectMap(errorMsg, (v: any) => sum += v.length)

        return correct && sum === 0;
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

    const updateCurrentUser = (user: User) => {
        const localUser = localStorage.getItem('auth_user');
        const authenticatedUser: User = localUser && localUser?.length > 0 ? JSON.parse(localUser) : undefined;

        const combineLocal: User = { ...authenticatedUser, ...user } as User;
        localStorage.setItem('auth_user', JSON.stringify(combineLocal));

        const combineAuth: User = { ...authUser, ...user } as User;
        setAuthUser(combineAuth);
    }

    const handleEdit = React.useCallback(async () => {
        if (!validate()) { return; }
        let oldData: OldUser = { first_name, last_name, email, id: data.id, student_id, major: major?.id } as OldUser
        const res = await updateUserOld(oldData, type);
        if (res) {
            const user: User = res?.user ? res.user : res;
            if (user.id === authUser.id) {
                updateCurrentUser(user);
            }
            off();
            refetch();
        }
    }, [first_name, last_name, email, student_id, major, type, authUser, data.id])

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
                            <Field title={"Nr albumuD"} value={student_id} type={'number'} setValue={setStudentId} errorMsg={errorMsg['student_id']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'student_id': e }))} maxLenght={6} />
                            {majorsData && <MajorsDropDown title='Kierunek' values={majorsData} value={major} setValue={setMajor} errorMsg={errorMsg['major']} setErrorMsg={(value: string) => setErrorMsg(prevState => ({ ...prevState, 'major': value }))} />}
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