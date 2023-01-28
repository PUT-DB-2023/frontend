import { Button } from 'components/Button';
import { ModalContainer } from 'components/ModalContainer';
import * as React from 'react';
import { ButtonType } from 'types';
import { deleteMajor } from '../api/deleteMajor';
import { Major } from '../types';

interface IRemoveModal {
    show: boolean,
    off: () => void,
    major?: Major,
    refetch: () => void,
}

export const RemoveModal = ({ show, off, major, refetch }: IRemoveModal) => {
    const handleRemove = React.useCallback(async () => {
        const res = await deleteMajor(major?.id)
        if (res) {
            refetch();
            off();
        }
    }, [major?.id])

    const buttons = <>
        <Button type={ButtonType.TEXT_WARNING} text='Anuluj' onClick={off} />
        <Button type={ButtonType.WARNING} text='Usuń' onClick={handleRemove} />
    </>

    if (show) {
        return (
            <ModalContainer title={'Usuwanie kierunku'} off={off} buttons={buttons}>
                Operacja ta spowoduje usunięcie kierunku <strong>{major?.name}</strong>.<br />
                Czy chcesz kontynuować?
            </ModalContainer>
        );
    } else {
        return null;
    }
};

RemoveModal.displayName = 'RemoveModal';