import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { deleteSemester } from '../api/deleteSemester'

interface IRemoveModal {
    show: boolean,
    off: () => void,
    id: string | undefined,
    name: string,
    refetch: () => void;
}

export const RemoveModal = ({ show, off, id, name, refetch }: IRemoveModal) => {
    const handleRemove = React.useCallback(async () => {
        const res = await deleteSemester(id)
        if (res) {
            off();
            refetch();
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