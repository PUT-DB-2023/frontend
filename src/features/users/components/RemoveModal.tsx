import { Button } from 'components/Button';
import { ModalContainer } from 'components/ModalContainer';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonType, UserType } from 'types';
import { deleteUserOld } from '../api/deleteUser';

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
        if (res) {
            off();
            navigate(-1)
        }
    }, [id, type])

    const buttons = <>
        <Button type={ButtonType.TEXT_ACTION} text='Anuluj' onClick={off} />
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