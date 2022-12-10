import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { activateSemester } from '../api/activateSemester';

interface IActivateModal {
    show: boolean,
    off: () => void,
    id: string | undefined,
    name: string,
    allRefetch: (...args: any[]) => void,
}

export const ActivateModal = ({ show, off, id, name, allRefetch }: IActivateModal) => {
    const handleActivate = React.useCallback(async () => {
        const res = await activateSemester(id)
        console.log('RES', res)
        if (res) {
            off();
            allRefetch();
        }
    }, [id])

    const buttons = <>
        <Button type={ButtonType.OUTLINE} text='Anuluj' onClick={off} />
        <Button type={ButtonType.ACTION} text='Ustaw' onClick={handleActivate} />
    </>

    if (show) {
        return (
            <ModalContainer title={name} off={off} buttons={buttons}>
                Czy na pewno chcesz zmienić bieżący semestr? Spowoduje to deaktywację bieżącego semestru.
            </ModalContainer>
        );
    } else {
        return null;
    }
};

ActivateModal.displayName = 'ActivateModal';