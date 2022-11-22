import { Button } from 'components/Button';
import { Field } from 'components/Field';
import { ModalContainer } from 'components/ModalContainer';
import * as React from 'react';
import { ButtonType } from 'types';
import { updateCourse } from '../api/updateCourse';

interface IEditModal {
    show: boolean,
    off: () => void,
    refetch: () => void,
    data: {name: string, id: string, description: string}
}

export const EditModal = ({ show, off, refetch, data }: IEditModal) => {
    const [name, setName] = React.useState(data.name);
    const [description, setDescription] = React.useState(data.description);
    
    React.useEffect(()=>{
        setName(data.name);
        setDescription(data.description);
    },[show, data])
    
    const handleUpdate = React.useCallback(async () => {
        const res = await updateCourse({id: data.id, name, description})
        if (res.data) {
            off();
            refetch();
         }
    }, [name, description, data])

    if (show) {
        return (
            <ModalContainer title={data.name} off={off}>
                <div className={`flex flex-col gap-1`}>
                    <Field title={"Nazwa"} value={name} setValue={setName} />
                    <Field title={"Opis"} value={description} setValue={setDescription} />
                </div>
                <div className={`flex gap-2 mt-10`}>
                    <Button type={ButtonType.OUTLINE} text='Anuluj' onClick={off} />
                    <Button type={ButtonType.ACTION} text='Zapisz zmiany' onClick={handleUpdate} />
                </div>
            </ModalContainer>
        );
    } else {
        return null;
    }
};

EditModal.displayName = 'EditModal';