import { Button } from 'components/Button';
import { ModalContainer } from 'components/ModalContainer';
import { queryClient } from 'lib/react-query';
import * as React from 'react';
import { ButtonType } from 'types';
import { removeStudentFromGroup } from '../api/removeStudentFromGroup';

interface IRemoveStudentFromGroupModal {
    show: boolean,
    off: () => void,
    group_id: string | undefined;
    student_id: string | undefined;
}

export const RemoveStudentFromGroupModal = ({ show, off, group_id, student_id }: IRemoveStudentFromGroupModal) => {
    const handleRemove = React.useCallback(async () => {
        const res = await removeStudentFromGroup(group_id, student_id)
        if (res) {
            await queryClient.refetchQueries('group')
            off();
        }
    }, [group_id, student_id])

    const buttons = <>
        <Button type={ButtonType.TEXT_WARNING} text='Anuluj' onClick={off} />
        <Button type={ButtonType.WARNING} text='Usuń' onClick={handleRemove} />
    </>

    if (show) {
        return (
            <ModalContainer title={'Usuwanie studenta z grupy'} off={off} buttons={buttons}>
                Jesteś pewny?
            </ModalContainer>
        );
    } else {
        return null;
    }
};

RemoveStudentFromGroupModal.displayName = 'RemoveStudentFromGroupModal';