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
    data: { name: string, id: string, description: string }
}

export const EditModal = ({ show, off, refetch, data }: IEditModal) => {
    const [name, setName] = React.useState(data.name);
    const [description, setDescription] = React.useState(data.description);
    const defaultMsg = { name: '' }
    const [errorMsg, setErrorMsg] = React.useState(defaultMsg);

    React.useEffect(() => {
        setName(data.name);
        setDescription(data.description);
        setErrorMsg(defaultMsg);
    }, [show, data])

    const validate = React.useCallback(() => {
        let correct = true;

        if (name.length === 0) {
            setErrorMsg({ ...errorMsg, 'name': 'Pole wymagane' })
            correct = false;
        }

        return correct;
    }, [name, description, errorMsg])

    const handleUpdate = React.useCallback(async () => {
        if (!validate()) {
            return;
        }
        const res = await updateCourse({ id: data.id, name, description })
        if (res) {
            off();
            refetch();
        }
    }, [name, description, data])

    const buttons = <>
        <Button type={ButtonType.TEXT_ACTION} text='Anuluj' onClick={off} />
        <Button type={ButtonType.ACTION} text='Zapisz' onClick={handleUpdate} />
    </>

    if (show) {
        return (
            <ModalContainer title={data.name} off={off} buttons={buttons}>
                <div className={`flex flex-col gap-1`}>
                    <Field title={"Nazwa"} value={name} setValue={setName} autoFocus={true} errorMsg={errorMsg['name']} setErrorMsg={(e: string) => setErrorMsg({ ...errorMsg, 'name': e })} maxLenght={50}/>
                    <Field title={"Opis"} value={description} setValue={setDescription} maxLenght={255}/>
                </div>
            </ModalContainer>
        );
    } else {
        return null;
    }
};

EditModal.displayName = 'EditModal';