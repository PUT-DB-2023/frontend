import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Button } from 'components/Button';
import { ButtonType, UserType } from 'types';
import { useNavigate } from 'react-router-dom'
import { deleteUserOld } from '../api/deleteUser'
import { resetPassword } from '../api/resetPassword';

interface IPasswordResetModal {
    show: boolean,
    off: () => void,
    id: string | undefined,
}

export const PasswordResetModal = ({ show, off, id }: IPasswordResetModal) => {
    const navigate = useNavigate();
    const handlePasswordReset = React.useCallback(async () => {
        const res = await resetPassword(id)
        if (res) {
            off();
            // navigate(dest)
        }
    }, [id])

    const buttons = <>
        <Button type={ButtonType.TEXT_ACTION} text='Anuluj' onClick={off} />
        <Button type={ButtonType.ACTION} text='Ok' onClick={handlePasswordReset} />
    </>

    if (show) {
        return (
            <ModalContainer title={"Resetuj hasło"} off={off} buttons={buttons}>
                Czy na pewno chcesz zresetować hasło?
            </ModalContainer>
        );
    } else {
        return null;
    }
};

PasswordResetModal.displayName = 'PasswordResetModal';