import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { deleteServer } from '../api/deleteServer'
import { useNavigate,  } from 'react-router-dom'
import { showToast } from 'api/showToast';

interface IRemoveModal {
    show: boolean,
    off: () => void,
    id: string | undefined,
    name: string
}

export const RemoveModal = ({ show, off, id, name }: IRemoveModal) => {
    const navigate = useNavigate()
    const handleRemove = React.useCallback(async () => {
        const res = await deleteServer(id)
        if (res.status) {
            off();
            navigate('/servers')
            showToast({refetch: res, messages: {
                pending: 'Usuwanie..',
                success: 'Pomyślnie usunięto serwer.',
                error: 'Nie udało się usunąć serwera.',
            }})
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