import { Button } from 'components/Button';
import { ModalContainer } from 'components/ModalContainer';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonType } from 'types';
import { deleteServer } from '../api/deleteServer';
import { Server } from '../types';

interface IRemoveModal {
    show: boolean,
    server: Server,
    off: () => void,
}

export const RemoveModal = ({ show, off, server }: IRemoveModal) => {
    const navigate = useNavigate()
    const handleRemove = React.useCallback(async () => {
        const res = await deleteServer(server?.id)
        if (res) {
            off();
            navigate(-1)
        }
    }, [server?.id])

    const buttons = <>
        <Button type={ButtonType.TEXT_WARNING} text='Anuluj' onClick={off} />
        <Button type={ButtonType.WARNING} text='Usuń' onClick={handleRemove} />
    </>

    if (show) {
        return (
            <ModalContainer title={'Usuwanie serwera'} off={off} buttons={buttons}>
                Operacja ta spowoduje usunięcie serwera <strong>{server?.name}</strong>.<br />
                Czy chcesz kontynuować?
            </ModalContainer>
        );
    } else {
        return null;
    }
};

RemoveModal.displayName = 'RemoveModal';