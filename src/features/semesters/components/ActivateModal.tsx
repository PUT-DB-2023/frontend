import { Button } from 'components/Button';
import { ModalContainer } from 'components/ModalContainer';
import * as React from 'react';
import { ButtonType } from 'types';
import { activateSemester } from '../api/activateSemester';
import { Semester } from '../types';

interface IActivateModal {
    show: boolean,
    off: () => void,
    semester?: Semester,
    allRefetch: (...args: any[]) => void,
}

export const ActivateModal = ({ show, off, semester, allRefetch }: IActivateModal) => {
    const handleActivate = React.useCallback(async () => {
        const res = await activateSemester(semester?.id)
        if (res) {
            off();
            allRefetch();
        }
    }, [semester?.id])

    const buttons = <>
        <Button type={ButtonType.TEXT_ACTION} text='Anuluj' onClick={off} />
        <Button type={ButtonType.ACTION} text='Ustaw' onClick={handleActivate} />
    </>

    const activateName = 'Zmień bieżący semestr na ' + semester?.start_year + '/' + ((semester?.start_year || '0') + 1) + ' - ' + (semester?.winter ? 'Zima' : 'Lato')

    if (show) {
        return (
            <ModalContainer title={activateName} off={off} buttons={buttons}>
                Czy na pewno chcesz zmienić bieżący semestr?
                <br /> <br /> Spowoduje to deaktywację bieżącego semestru oraz edycji przypisanych do tego semestru.
            </ModalContainer>
        );
    } else {
        return null;
    }
};

ActivateModal.displayName = 'ActivateModal';