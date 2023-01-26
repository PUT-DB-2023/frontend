import { Button } from 'components/Button';
import { ModalContainer } from 'components/ModalContainer';
import * as React from 'react';
import { ButtonType } from 'types';
import { removeStudentsWithoutGroups } from '../api/removeStudentsWithoutGroups';

interface IRemoveStudentsWithoutGroupsModal {
    show: boolean,
    off: () => void,
    refetch: () => void,
}

export const RemoveStudentsWithoutGroupsModal = ({ show, off, refetch }: IRemoveStudentsWithoutGroupsModal) => {
    const handleRemove = React.useCallback(async () => {
        const res = await removeStudentsWithoutGroups();
        if (res) {
            refetch();
            off();
        }
    }, [])

    const buttons = <>
        <Button type={ButtonType.TEXT_WARNING} text='Anuluj' onClick={off} />
        <Button type={ButtonType.WARNING} text='Usuń' onClick={handleRemove} />
    </>

    if (show) {
        return (
            <ModalContainer title={"Usuwanie studentów bez grup"} off={off} buttons={buttons}>
                Operacja ta spowoduje usunięcie wszystkich studentów bez grup.<br/>
                Czy chcesz kontynuować?
            </ModalContainer>
        );
    } else {
        return null;
    }
};

RemoveStudentsWithoutGroupsModal.displayName = 'RemoveStudentsWithoutGroupsModal';