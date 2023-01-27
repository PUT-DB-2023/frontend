import { Button } from 'components/Button';
import { ModalContainer } from 'components/ModalContainer';
import { queryClient } from 'lib/react-query';
import * as React from 'react';
import { ButtonType } from 'types';
import { removeStudentFromGroup } from '../api/removeStudentFromGroup';
import { Student } from 'features/users'
import { Group } from '../types';

interface IRemoveStudentFromGroupModal {
    show: boolean,
    off: () => void,
    student?: Student,
    group?: Group
}

export const RemoveStudentFromGroupModal = ({ show, off, student, group }: IRemoveStudentFromGroupModal) => {
    const handleRemove = React.useCallback(async () => {
        const res = await removeStudentFromGroup(group?.id, student?.id)
        if (res) {
            await queryClient.refetchQueries('group')
            off();
        }
    }, [group?.id, student?.id])

    const buttons = <>
        <Button type={ButtonType.TEXT_WARNING} text='Anuluj' onClick={off} />
        <Button type={ButtonType.WARNING} text='Usuń' onClick={handleRemove} />
    </>

    if (show) {
        return (
            <ModalContainer title={'Usuwanie studenta z grupy'} off={off} buttons={buttons}>
                Operacja ta spowoduje usunięcie studenta <strong>{student?.user?.first_name} {student?.user?.last_name}</strong> z grupy <strong>{group?.name}</strong>.<br />
                Czy chcesz kontynuować?
            </ModalContainer>
        );
    } else {
        return null;
    }
};

RemoveStudentFromGroupModal.displayName = 'RemoveStudentFromGroupModal';