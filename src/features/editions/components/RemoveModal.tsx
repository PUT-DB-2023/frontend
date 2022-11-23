import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { deleteEdition } from '../api/deleteEdition'
import { useNavigate,  } from 'react-router-dom'

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
        if (res.status) {
            off();
            refetch();
            console.log('REDIRECTING..')
            courseId ? navigate(`/courses/${courseId}`) :  navigate('/courses')
         } else {   
         }
    }, [editionId])

    if (show) {
        return (
            <ModalContainer title={name} off={off}>
                Jesteś pewny?
                <div className={`flex gap-2 mt-10`}>
                    <Button type={ButtonType.OUTLINE} text='Anuluj' onClick={off} />
                    <Button type={ButtonType.ACTION} text='Usuń' onClick={handleRemove} />
                </div>
            </ModalContainer>
        );
    } else {
        return null;
    }
};

RemoveModal.displayName = 'RemoveModal';