import { Button } from 'components/Button';
import { ModalContainer } from 'components/ModalContainer';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonType, UserType } from 'types';
import { isStudentOrTeacher } from '../api/checkUserType';
import { deleteUserOld } from '../api/deleteUser';
import { Teacher, Student, Admin } from '../types';

interface IRemoveModal {
    show: boolean,
    off: () => void,
    user: Student | Teacher | Admin,
    id: string | undefined,
    type: UserType,
}

export const RemoveModal = ({ show, off, user, id, type }: IRemoveModal) => {
    const navigate = useNavigate();
    const handleRemove = React.useCallback(async () => {
        const res = await deleteUserOld(user?.id, type)
        if (res) {
            off();
            navigate(-1);
        }
    }, [user?.id, type])

    const buttons = <>
        <Button type={ButtonType.TEXT_WARNING} text='Anuluj' onClick={off} />
        <Button type={ButtonType.WARNING} text='Usuń' onClick={handleRemove} />
    </>

    const typeName = type === UserType.TEACHER ? 'dydaktyka' : (type === UserType.STUDENT ? 'studenta' : (type === UserType.ADMIN ? 'admina' : 'użytkownika'));
    const first_name = isStudentOrTeacher(user) ? user?.user?.first_name : (user?.first_name ? user?.first_name : '');
    const last_name = isStudentOrTeacher(user) ? user?.user?.last_name : (user?.last_name ? user?.last_name : '');

    if (show) {
        return (
            <ModalContainer title={`Usuwanie ${typeName}`} off={off} buttons={buttons}>
                Operacja ta spowoduje usunięcie {typeName} <strong>{first_name} {last_name}</strong>.<br />
                Czy chcesz kontynuować?
            </ModalContainer>
        );
    } else {
        return null;
    }
};

RemoveModal.displayName = 'RemoveModal';