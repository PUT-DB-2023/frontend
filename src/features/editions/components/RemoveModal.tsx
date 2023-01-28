import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { deleteEdition } from '../api/deleteEdition'
import { Edition } from '../types';
import { useNavigate } from 'react-router';
import { queryClient } from 'lib/react-query';

interface IRemoveModal {
    show: boolean,
    off: () => void,
    edition?: Edition
    courseId: string | undefined,
    editionId: string | undefined,
    name: string,
    refetch: () => void
}

export const RemoveModal = ({ show, off, editionId, courseId, edition, refetch }: IRemoveModal) => {
    const navigate = useNavigate()
    const handleRemove = React.useCallback(async () => {
        const res = await deleteEdition(editionId)
        if (res.status) {
            refetch();
            // queryClient.removeQueries('selectedEdition')
            off();
            // courseId ? navigate(`/courses/${courseId}`) : navigate('/courses')
        } else {
        }
    }, [editionId])

    const buttons = <>
        <Button type={ButtonType.TEXT_WARNING} text='Anuluj' onClick={off} />
        <Button type={ButtonType.WARNING} text='Usuń' onClick={handleRemove} />
    </>

    if (show) {
        return (
            <ModalContainer title={'Usuwanie edycji'} off={off} buttons={buttons}>
                Operacja ta spowoduje usunięcie edycji <strong>{edition?.semester.start_year}/{edition && edition.semester.start_year + 1} - {edition?.semester.winter ? "Zima" : "Lato"}</strong>.<br />
                Czy chcesz kontynuować?
            </ModalContainer>
        );
    } else {
        return null;
    }
};

RemoveModal.displayName = 'RemoveModal';