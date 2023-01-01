import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { UserType } from 'types';
import { addUserOld } from '../api/addUser';
import { OldUser } from '../types';

export const AddNewModal = ({ show, off, refetch, type }: { show: boolean, off: () => void, refetch: () => void, type: UserType }) => {
    const [first_name, setFirstName] = React.useState('');
    const [last_name, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [student_id, setStudentId] = React.useState<number>();
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

    const handleOff = React.useCallback(() => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setStudentId(undefined);
        setErrorMsg(defaultMsg);
        off();
    }, [])

    const handleAdd = React.useCallback(async () => {
        if (!validate()) { return; }
        let data = { first_name, last_name, email, student_id };
        const res = await addUserOld(data as OldUser, type);
        if (res) {
            handleOff();
            refetch();
        }
    }, [first_name, last_name, email, student_id, type])

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
                        <Field title={"Student ID"} value={student_id} type={'number'} setValue={setStudentId} errorMsg={errorMsg['student_id']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'student_id': e }))} maxLenght={6} />}
                </div>
            </ModalContainer>
        );
    } else {
        return null;
    }
};

AddNewModal.displayName = 'AddNewModal';