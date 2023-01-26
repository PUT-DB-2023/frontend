import { Button } from 'components/Button';
import { ModalContainer } from 'components/ModalContainer';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonType } from 'types';
import { deleteCourse } from '../api/deleteCourse';

interface IRemoveModal {
    show: boolean,
    off: () => void,
    id: string | undefined,
    name: string
}

export const RemoveModal = ({ show, off, id, name }: IRemoveModal) => {
    const navigate = useNavigate()

    const handleRemove = React.useCallback(async () => {
        const res = await deleteCourse(id);
        if (res.status) {
            off();
            navigate('/courses');
        }
    }, [id])

    const buttons = <>
        <Button type={ButtonType.TEXT_WARNING} text='Anuluj' onClick={off} />
        <Button type={ButtonType.WARNING} text='Usuń' onClick={handleRemove} />
    </>

    if (show) {
        return (
            <ModalContainer title={name} off={off} buttons={buttons}>
                Operacja ta spowoduje usunięcie przedmiotu.<br/>
                Czy chcesz kontynuować?
            </ModalContainer>
        );
    } else {
        return null;
    }
};

RemoveModal.displayName = 'RemoveModal';