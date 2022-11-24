import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { UserType } from 'types';
import { updateUserOld } from '../api/updateUser';
import { OldUser } from '../types';

export const EditModal = ({ show, off, refetch, type, data }: { show: boolean, off: () => void, refetch: () => void, type: UserType, data: OldUser}) => {
    const [first_name, setFirstName] = React.useState(data?.first_name);
    const [last_name, setLastName] = React.useState(data?.last_name);
    const [email, setEmail] = React.useState(data?.email);
    const [password, setPassword] = React.useState(data?.password);
    const [student_id, setStudentId] = React.useState<number | undefined>(data?.student_id);

    const handleOff = React.useCallback(() => {
        setFirstName(data?.first_name);
        setLastName(data?.last_name);
        setEmail(data?.email);
        setPassword(data?.password);
        setStudentId(data?.student_id);
        off();
    }, [data])

    const handleEdit = React.useCallback(async () => {
        let newData = { first_name, last_name, email, password, student_id, id: data.id };
        const res = await updateUserOld(newData, type);
        if (res.data) {
            handleOff();
            refetch();
        }
    }, [first_name, last_name, email, password, student_id, type, data.id])

    const name = 'Edytuj ' + (type === UserType.ADMIN ? 'admina' : (type === UserType.TEACHER ? 'nauczyciela' : (type === UserType.STUDENT ? 'studenta' : '')))

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
                    <Button type={ButtonType.ACTION} text='Zapisz' onClick={handleEdit} />
                </div>
            </ModalContainer>
        );
    } else {
        return null;
    }
};

EditModal.displayName = 'EditModal';