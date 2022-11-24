import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { UserType } from 'types';
import { addUserOld } from '../api/addUser';

export const AddNewModal = ({ show, off, refetch, type }: { show: boolean, off: () => void, refetch: () => void, type: UserType }) => {
    const [first_name, setFirstName] = React.useState('');
    const [last_name, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [student_id, setStudentId] = React.useState<number>();

    const handleOff = React.useCallback(() => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setStudentId(undefined);
        off();
    }, [])

    const handleAdd = React.useCallback(async () => {
        let data = { first_name, last_name, email, password, student_id };
        const res = await addUserOld(data, type);
        if (res.data) {
            handleOff();
            refetch();
        }
    }, [first_name, last_name, email, password, student_id, type])

    const name = 'Dodaj ' + (type === UserType.ADMIN ? 'admina' : (type === UserType.TEACHER ? 'nauczyciela' : (type === UserType.STUDENT ? 'studenta' : '')))

    if (show) {
        return (
            <ModalContainer title={name} off={handleOff}>
                <div className={`flex flex-col gap-1`}>
                    <Field title={"Imię"} value={first_name} setValue={setFirstName} />
                    <Field title={"Nazwisko"} value={last_name} setValue={setLastName} />
                    <Field title={"Email"} value={email} setValue={setEmail} />
                    <Field title={"Hasło"} type={'password'} value={password} setValue={setPassword} />
                    {type === UserType.STUDENT && <Field title={"Student ID"} value={student_id} setValue={setStudentId} />}
                </div>
                <div className={`flex flex-wrap gap-2 mt-10`}>
                    <Button type={ButtonType.OUTLINE} text='Anuluj' onClick={handleOff} />
                    <Button type={ButtonType.ACTION} text='Dodaj' onClick={handleAdd} />
                </div>
            </ModalContainer>
        );
    } else {
        return null;
    }
};

AddNewModal.displayName = 'AddNewModal';