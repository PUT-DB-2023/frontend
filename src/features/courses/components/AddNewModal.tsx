import { Button } from 'components/Button';
import { Field } from 'components/Field';
import { ModalContainer } from 'components/ModalContainer';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonType } from 'types';
import { addCourse } from '../api/addCourse';

export const AddNewModal = ({ show, off, refetch }: { show: boolean, off: () => void, refetch: any }) => {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const defaultMsg = { name: '' }
    const [errorMsg, setErrorMsg] = React.useState(defaultMsg);

    const navigate = useNavigate()

    const validate = React.useCallback(() => {
        let correct = true;

        if (name.length === 0) {
            setErrorMsg({ ...errorMsg, 'name': 'Pole wymagane' })
            correct = false;
        }

        return correct;
    }, [name, errorMsg])

    const handleOff = React.useCallback(() => {
        setName('');
        setDescription('');
        setErrorMsg(defaultMsg);
        off();
    }, [])

    const handleAdd = React.useCallback(async () => {
        if (!validate()) {
            return;
        }
        const res = await addCourse({ name, description });
        if (res.data) {
            handleOff();
            refetch()
            navigate(`${res.data.id}/`)
        }
    }, [name, description])

    const buttons = <>
        <Button type={ButtonType.OUTLINE} text='Anuluj' onClick={handleOff} />
        <Button type={ButtonType.ACTION} text='Dodaj' onClick={handleAdd} />
    </>

    if (show) {
        return (
            <ModalContainer title='Nowy przedmiot' off={handleOff} buttons={buttons}>
                <div className={`flex flex-col gap-1`}>
                    <Field title={"Nazwa"} value={name} setValue={setName} autoFocus={true} errorMsg={errorMsg['name']} setErrorMsg={(e: string) => setErrorMsg({ ...errorMsg, 'name': e })} />
                    <Field title={"Opis"} value={description} setValue={setDescription} multiline={true} />
                </div>
            </ModalContainer>
        );
    } else {
        return null;
    }
};

AddNewModal.displayName = 'AddNewModal';