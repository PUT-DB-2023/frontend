import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Button } from 'components/Button';
import { ButtonType, UserType } from 'types';
import { useNavigate } from 'react-router-dom'
import { deleteUserOld } from '../api/deleteUser'

interface IRemoveModal {
    show: boolean,
    off: () => void,
    id: string | undefined,
    type: UserType,
}

export const RemoveModal = ({ show, off, id, type }: IRemoveModal) => {
    const navigate = useNavigate();
    const handleRemove = React.useCallback(async () => {
        const dest = '/users' + (type === UserType.TEACHER ? "/teachers" : (type === UserType.ADMIN ? "/admins" : (type === UserType.STUDENT ? "/students" : "")));
        const res = await deleteUserOld(id, type)
        if (res.status) {
            off();
            navigate(dest)
        }
    }, [id, type])

    const buttons = <>
        <Button type={ButtonType.OUTLINE} text='Anuluj' onClick={off} />
        <Button type={ButtonType.ACTION} text='Usuń' onClick={handleRemove} />
    </>

    if (show) {
        return (
            <ModalContainer title={"Usuń użytkownika"} off={off} buttons={buttons}>
                Jesteś pewny?
            </ModalContainer>
        );
    } else {
        return null;
    }
};

RemoveModal.displayName = 'RemoveModal';