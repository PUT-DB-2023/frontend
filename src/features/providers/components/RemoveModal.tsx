import { Button } from 'components/Button';
import { ModalContainer } from 'components/ModalContainer';
import * as React from 'react';
import { ButtonType } from 'types';
import { deleteProvider } from '../api/deleteProvider';
import { Provider } from '../types';

interface IRemoveModal {
    show: boolean,
    off: () => void,
    provider?: Provider,
    refetch: () => void,
}

export const RemoveModal = ({ show, off, provider, refetch }: IRemoveModal) => {
    const handleRemove = React.useCallback(async () => {
        const res = await deleteProvider(provider?.id)
        if (res) {
            refetch();
            off();
        }
    }, [provider?.id])

    const buttons = <>
        <Button type={ButtonType.TEXT_WARNING} text='Anuluj' onClick={off} />
        <Button type={ButtonType.WARNING} text='Usuń' onClick={handleRemove} />
    </>

    if (show) {
        return (
            <ModalContainer title={'Usuwanie systemu bazodanowego'} off={off} buttons={buttons}>
                Operacja ta spowoduje usunięcie systemu bazodanowego <strong>{provider?.name}</strong>.<br />
                Czy chcesz kontynuować?
            </ModalContainer>
        );
    } else {
        return null;
    }
};

RemoveModal.displayName = 'RemoveModal';