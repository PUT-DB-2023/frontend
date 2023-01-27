import { Button } from 'components/Button';
import { ModalContainer } from 'components/ModalContainer';
import * as React from 'react';
import { ButtonType } from 'types';
import { deleteProvider } from '../api/deleteProvider';

interface IRemoveModal {
    show: boolean,
    off: () => void,
    id: string | undefined,
    name: string
    refetch: () => void;
}

export const RemoveModal = ({ show, off, id, name, refetch }: IRemoveModal) => {
    const handleRemove = React.useCallback(async () => {
        const res = await deleteProvider(id)
        if (res) {
            refetch();
            off();
        }
    }, [id])

    const buttons = <>
        <Button type={ButtonType.TEXT_WARNING} text='Anuluj' onClick={off} />
        <Button type={ButtonType.WARNING} text='Usuń' onClick={handleRemove} />
    </>

    if (show) {
        return (
            <ModalContainer title={name} off={off} buttons={buttons}>
                Operacja ta spowoduje usunięcie systemu bazodanowego.<br />
                Czy chcesz kontynuować?
            </ModalContainer>
        );
    } else {
        return null;
    }
};

RemoveModal.displayName = 'RemoveModal';