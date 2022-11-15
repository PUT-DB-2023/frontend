import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { deleteCourse } from '../api/deleteCourse'
import { useNavigate,  } from 'react-router-dom'
import { toast } from 'react-toastify';

interface IRemoveModal {
    show: boolean,
    off: () => void,
    id: string | undefined,
    name: string
}

export const RemoveModal = ({ show, off, id, name }: IRemoveModal) => {
    const navigate = useNavigate()

    const showToast = async (res : Promise<any>) => {
        return await toast.promise(res, {
            pending: "Usuwanie..",
            success: "Pomyślnie usunięto przedmiot.",
            error: "Nie udało się usunąć przedmiotu.",
        })
    }

    const handleRemove = React.useCallback(async () => {
        const res = await deleteCourse(id)
        if (res.status) {
            off();
            navigate('/courses')
            showToast(res)
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