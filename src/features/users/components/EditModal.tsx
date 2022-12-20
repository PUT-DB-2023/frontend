import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { UserType } from 'types';
import { updateUserOld } from '../api/updateUser';
import { OldUser } from '../types';

interface IEditModal {
    show: boolean,
    off: () => void,
    refetch: () => void,
    type: UserType
    data: OldUser,
}

export const EditModal = ({ show, off, refetch, type, data }: IEditModal) => {
    const [first_name, setFirstName] = React.useState(data?.first_name);
    const [last_name, setLastName] = React.useState(data?.last_name);
    const [email, setEmail] = React.useState(data?.email);
    const [student_id, setStudentId] = React.useState<number | undefined>(data?.student_id);
    const defaultMsg = { first_name: '', last_name: '', email: '', student_id: '' }
    const [errorMsg, setErrorMsg] = React.useState(defaultMsg);

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
        if (!student_id && type === UserType.STUDENT) {
            setErrorMsg(prevState => ({ ...prevState, 'student_id': 'Pole wymagane' }));
            correct = false;
        }

        return correct;
    }, [first_name, last_name, email, student_id])

    React.useEffect(() => {
        setFirstName(data?.first_name);
        setLastName(data?.last_name);
        setEmail(data?.email);
        setStudentId(data?.student_id);
        setErrorMsg(defaultMsg);
    }, [show, data])

    const handleOff = React.useCallback(() => {
        setFirstName(data?.first_name);
        setLastName(data?.last_name);
        setEmail(data?.email);
        setStudentId(data?.student_id);
        setErrorMsg(defaultMsg);
        off();
    }, [data])

    const handleEdit = React.useCallback(async () => {
        if (!validate()) { return; }
        let newData = { first_name, last_name, email, student_id, id: data.id };
        const res = await updateUserOld(newData as OldUser, type);
        if (res.data) {
            handleOff();
            refetch();
        }
    }, [first_name, last_name, email, student_id, type, data.id])

    const name = 'Edytuj ' + (type === UserType.ADMIN ? 'admina' : (type === UserType.TEACHER ? 'nauczyciela' : (type === UserType.STUDENT ? 'studenta' : '')))

    const buttons = <>
        <Button type={ButtonType.TEXT_ACTION} text='Anuluj' onClick={handleOff} />
        <Button type={ButtonType.ACTION} text='Zapisz' onClick={handleEdit} />
    </>

    if (show) {
        return (
            <ModalContainer title={name} off={handleOff} buttons={buttons}>
                <div className={`flex flex-col gap-1`}>
                    <Field title={"Imię"} value={first_name} setValue={setFirstName} autoFocus={true} errorMsg={errorMsg['first_name']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'first_name': e }))} maxLenght={30} />
                    <Field title={"Nazwisko"} value={last_name} setValue={setLastName} errorMsg={errorMsg['last_name']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'last_name': e }))} maxLenght={30} />
                    <Field title={"Email"} value={email} type={'email'} setValue={setEmail} errorMsg={errorMsg['email']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'email': e }))} maxLenght={70} />
                    {type === UserType.STUDENT &&
                        <Field title={"Student ID"} value={student_id} type={'number'} setValue={setStudentId} errorMsg={errorMsg['student_id']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'student_id': e }))} maxLenght={6} />}
                </div>
            </ModalContainer>
        );
    } else {
        return null;
    }
};

EditModal.displayName = 'EditModal';