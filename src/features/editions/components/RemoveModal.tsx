import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { deleteEdition } from '../api/deleteEdition'
import { useNavigate, } from 'react-router-dom'

interface IRemoveModal {
    show: boolean,
    off: () => void,
    courseId: string | undefined,
    editionId: string | undefined,
    name: string,
    refetch: () => void
}

export const RemoveModal = ({ show, off, courseId, editionId, name, refetch }: IRemoveModal) => {
    const navigate = useNavigate()
    const handleRemove = React.useCallback(async () => {
        const res = await deleteEdition(editionId)
        if (res) {
            off();
            refetch();
            // courseId ? navigate(`/courses/${courseId}`) : navigate('/courses')
            navigate('/courses')
        }
    }, [editionId])

    const buttons = <>
        <Button type={ButtonType.TEXT_WARNING} text='Anuluj' onClick={off} />
        <Button type={ButtonType.WARNING} text='Usuń' onClick={handleRemove} />
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