import { Button } from 'components/Button';
import { ModalContainer } from 'components/ModalContainer';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonType } from 'types';
import { deleteGroup } from '../api/deleteGroup';
import { Group } from '../types';

interface IRemoveModal {
    show: boolean,
    off: () => void,
    group: Group,
}

export const RemoveModal = ({ show, off, group }: IRemoveModal) => {
    const navigate = useNavigate()
    const handleRemove = React.useCallback(async () => {
        const res = await deleteGroup(group?.id)
        if (res) {
            off();
            navigate(-1)
        }
    }, [group?.id])

    const buttons = <>
        <Button type={ButtonType.TEXT_WARNING} text='Anuluj' onClick={off} />
        <Button type={ButtonType.WARNING} text='Usuń' onClick={handleRemove} />
    </>

    if (show) {
        return (
            <ModalContainer title={'Usuwanie grupy'} off={off} buttons={buttons}>
                Operacja ta spowoduje usunięcie grupy <strong>{group.name} - {group.day} {group.hour}</strong> dla przedmiotu <strong>{group?.teacherEdition?.edition?.course?.name}</strong>.<br />
                Czy chcesz kontynuować?
            </ModalContainer>
        );
    } else {
        return null;
    }
};

RemoveModal.displayName = 'RemoveModal';