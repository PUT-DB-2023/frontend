import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { addCourse } from '../api/addCourse';
import { toast } from 'react-toastify';

export const AddNewModal = ({ show, off, refetch }: { show: boolean, off: () => void, refetch: any}) => {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const handleOff = React.useCallback(() => {
        setName('');
        setDescription('');
        off();
    }, [])

    const showToast = async () => {
        return await toast.promise(refetch, {
            pending: "Dodawanie..",
            success: "Pomyślnie dodano przedmiot.",
            error: "Nie udało się dodać przedmiotu.",
        })
    }

    const handleAdd = React.useCallback(async () => {
        const res = await addCourse({name, description});
        if (res.data) {
            handleOff();
            refetch()
            showToast()
        }
    }, [name, description])

    if (show) {
        return (
            <ModalContainer title='Nowy przedmiot' off={handleOff}>
                <div className={`flex flex-col gap-1`}>
                    <Field title={"Name"} value={name} setValue={setName} />
                    <Field title={"Description"} value={description} setValue={setDescription} />
                </div>
                <div className={`flex gap-2 mt-10 self-end`}>
                    <Button type={ButtonType.OUTLINE} text='Anuluj' onClick={handleOff} />
                    <Button type={ButtonType.ACTION} text='Dodaj' onClick={handleAdd} />
                </div>
            </ModalContainer>
        );
    } else {
        return null;
    }
};

AddNewModal.displayName = 'AddNewModal';