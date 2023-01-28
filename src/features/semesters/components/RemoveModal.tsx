import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { deleteSemester } from '../api/deleteSemester'
import { Semester } from '../types';

interface IRemoveModal {
    show: boolean,
    off: () => void,
    semester?: Semester,
    refetch: () => void,
}

export const RemoveModal = ({ show, off, semester, refetch }: IRemoveModal) => {
    const handleRemove = React.useCallback(async () => {
        const res = await deleteSemester(semester?.id)
        if (res) {
            off();
            refetch();
        }
    }, [semester?.id])

    const buttons = <>
        <Button type={ButtonType.TEXT_WARNING} text='Anuluj' onClick={off} />
        <Button type={ButtonType.WARNING} text='Usuń' onClick={handleRemove} />
    </>

    if (show) {
        return (
            <ModalContainer title={'Usuwanie semestru'} off={off} buttons={buttons}>
                Operacja ta spowoduje usunięcie semestru <strong>{semester?.start_year}/{semester && semester.start_year + 1} - {semester?.winter ? 'Zima' : 'Lato'}</strong>.<br />
                Czy chcesz kontynuować?
            </ModalContainer>
        );
    } else {
        return null;
    }
};

RemoveModal.displayName = 'RemoveModal';