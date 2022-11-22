import { Button } from 'components/Button';
import { Field } from 'components/Field';
import { ModalContainer } from 'components/ModalContainer';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonType } from 'types';
import { addCourse } from '../api/addCourse';

export const AddNewModal = ({ show, off, refetch }: { show: boolean, off: () => void, refetch: any}) => {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const navigate = useNavigate()

    const handleOff = React.useCallback(() => {
        setName('');
        setDescription('');
        off();
    }, [])

    const handleAdd = React.useCallback(async () => {
        const res = await addCourse({name, description});
        if (res.data) {
            handleOff();
            refetch()
            navigate(`${res.data.id}/`)
        }
    }, [name, description])

    if (show) {
        return (
            <ModalContainer title='Nowy przedmiot' off={handleOff}>
                <div className={`flex flex-col gap-1`}>
                    <Field title={"Nazwa"} value={name} setValue={setName} />
                    <Field title={"Opis"} value={description} setValue={setDescription} />
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