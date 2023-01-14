import { Button } from 'components/Button';
import { ModalContainer } from 'components/ModalContainer';
import * as React from 'react';
import { ButtonType, DbAccount } from 'types';
import { resetDBAccountPassword } from '../api/resetDBAcountPassword';
import { removeDBAccount } from '../api/removeDBAcount'

interface IRemoveModal {
    show: boolean,
    off: () => void,
    dbAccount: DbAccount | undefined;
}

export const RemoveDBAccountModal = ({ show, off, dbAccount }: IRemoveModal) => {
    const handleRemove = React.useCallback(async () => {
        const res = await removeDBAccount(dbAccount?.id);
        if (res) {
            off();
        }
    }, [dbAccount])

    const buttons = <>
        <Button type={ButtonType.TEXT_ACTION} text='Anuluj' onClick={off} />
        <Button type={ButtonType.ACTION} text='Usuń' onClick={handleRemove} />
    </>

    if (show) {
        return (
            <ModalContainer title={`Usuń konto "${dbAccount?.editionServer?.server?.name}"`} off={off} buttons={buttons}>
                Jesteś pewny?
            </ModalContainer>
        );
    } else {
        return null;
    }
};

RemoveDBAccountModal.displayName = 'RemoveDBAccountModal';