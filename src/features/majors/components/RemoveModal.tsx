import { Button } from 'components/Button';
import { ModalContainer } from 'components/ModalContainer';
import * as React from 'react';
import { ButtonType } from 'types';
import { deleteMajor } from '../api/deleteMajor';

interface IRemoveModal {
    show: boolean,
    off: () => void,
    id: string | undefined,
    name: string,
    refetch: () => void,
}

export const RemoveModal = ({ show, off, id, name, refetch }: IRemoveModal) => {
    const handleRemove = React.useCallback(async () => {
        const res = await deleteMajor(id)
        if (res) {
            refetch();
            off();
        }
    }, [id])

    const buttons = <>
        <Button type={ButtonType.TEXT_ACTION} text='Anuluj' onClick={off} />
        <Button type={ButtonType.ACTION} text='Usuń' onClick={handleRemove} />
    </>

    if (show) {
        return (
            <ModalContainer title={name} off={off} buttons={buttons}>
                Jesteś pewny?
            </ModalContainer>
        );
    } else {
        return null;
    }
};

RemoveModal.displayName = 'RemoveModal';