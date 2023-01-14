import { Button } from 'components/Button';
import { ModalContainer } from 'components/ModalContainer';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonType } from 'types';
import { resetPassword } from '../api/resetPassword';

interface IPasswordResetModal {
    show: boolean,
    off: () => void,
    id: string | undefined,
    owner?: boolean,
}

export const PasswordResetModal = ({ show, off, id, owner }: IPasswordResetModal) => {
    const navigate = useNavigate();
    const handlePasswordReset = React.useCallback(async () => {
        const res = await resetPassword(id, owner)
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