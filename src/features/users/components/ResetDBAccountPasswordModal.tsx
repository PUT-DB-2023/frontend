import { Button } from 'components/Button';
import { ModalContainer } from 'components/ModalContainer';
import * as React from 'react';
import { ButtonType, DbAccount } from 'types';
import { resetDBAccountPassword } from '../api/resetDBAcountPassword';

interface IResetModal {
    show: boolean,
    off: () => void,
    dbAccount: DbAccount | undefined;
}

export const ResetDBAccountPasswordModal = ({ show, off, dbAccount }: IResetModal) => {
    const handleReset = React.useCallback(async () => {
        const res = await resetDBAccountPassword(dbAccount?.id);
        if (res) {
            off();
        }
    }, [dbAccount])

    const buttons = <>
        <Button type={ButtonType.TEXT_ACTION} text='Anuluj' onClick={off} />
        <Button type={ButtonType.ACTION} text='Resetuj' onClick={handleReset} />
    </>

    if (show) {
        return (
            <ModalContainer title={`Resetuj hasło "${dbAccount?.editionServer?.server?.name}"`} off={off} buttons={buttons}>
                Akcja ta spowoduje zresetowanie obecnego hasła.<br />
                Nowe hasło zostanie wysłane mailem.
            </ModalContainer>
        );
    } else {
        return null;
    }
};

ResetDBAccountPasswordModal.displayName = 'ResetDBAccountPasswordModal';