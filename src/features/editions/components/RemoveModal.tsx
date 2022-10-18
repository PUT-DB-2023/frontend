import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { deleteEdition } from '../api/deleteEdition'
import { useNavigate,  } from 'react-router-dom'

interface IRemoveModal {
    show: boolean,
    off: () => void,
    id: string | undefined,
    courseId: string | undefined,
    name: string
}

export const RemoveModal = ({ show, off, id, courseId, name }: IRemoveModal) => {
    const navigate = useNavigate()
    const handleRemove = React.useCallback(async () => {
        const res = await deleteEdition(id)
        if (res.status) {
            off();
            courseId ? navigate(`/courses/${courseId}`) :  navigate('/courses')
         } else {
         }
    }, [id])

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