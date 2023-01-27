import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { deleteEdition } from '../api/deleteEdition'

interface IRemoveModal {
    show: boolean,
    off: () => void,
    courseId: string | undefined,
    editionId: string | undefined,
    name: string,
    refetch: () => void
}

export const RemoveModal = ({ show, off, courseId, editionId, name, refetch }: IRemoveModal) => {
    const handleRemove = React.useCallback(async () => {
        const res = await deleteEdition(editionId)
        if (res) {
            off();
            refetch();
        }
    }, [editionId])

    const buttons = <>
        <Button type={ButtonType.TEXT_WARNING} text='Anuluj' onClick={off} />
        <Button type={ButtonType.WARNING} text='Usuń' onClick={handleRemove} />
    </>

    if (show) {
        return (
            <ModalContainer title={name} off={off} buttons={buttons}>
                Operacja ta spowoduje usunięcie edycji.<br/>
                Czy chcesz kontynuować?
            </ModalContainer>
        );
    } else {
        return null;
    }
};

RemoveModal.displayName = 'RemoveModal';