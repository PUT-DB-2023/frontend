import { Button } from 'components/Button';
import { ModalContainer } from 'components/ModalContainer';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonType } from 'types';
import { deleteCourse } from '../api/deleteCourse';
import { Course } from '../types';

interface IRemoveModal {
    show: boolean,
    off: () => void,
    course: Course
}

export const RemoveModal = ({ show, off, course }: IRemoveModal) => {
    const navigate = useNavigate()

    const handleRemove = React.useCallback(async () => {
        const res = await deleteCourse(course?.id);
        if (res.status) {
            off();
            navigate('/courses');
        }
    }, [course?.id])

    const buttons = <>
        <Button type={ButtonType.TEXT_WARNING} text='Anuluj' onClick={off} />
        <Button type={ButtonType.WARNING} text='Usuń' onClick={handleRemove} />
    </>

    if (show) {
        return (
            <ModalContainer title={'Usuwanie przedmiotu'} off={off} buttons={buttons}>
                Operacja ta spowoduje usunięcie przedmiotu <strong>{course?.name}</strong>.<br />
                Czy chcesz kontynuować?
            </ModalContainer>
        );
    } else {
        return null;
    }
};

RemoveModal.displayName = 'RemoveModal';