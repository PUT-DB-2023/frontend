import { objectMap } from 'api/objectMap';
import { Button } from 'components/Button';
import { Field } from 'components/Field';
import { ModalContainer } from 'components/ModalContainer';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonType } from 'types';
import { addMajor } from '../api/addMajor';

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
        const res = await addMajor({ name, description });
        if (res) {
            handleOff();
            refetch()
            navigate(`${res.id}/`)
        }
    }, [name, description])

    const buttons = <>
        <Button type={ButtonType.TEXT_ACTION} text='Anuluj' onClick={handleOff} />
        <Button type={ButtonType.ACTION} text='Dodaj' onClick={handleAdd} />
    </>

    if (show) {
        return (
            <ModalContainer title='Nowy kierunek' off={handleOff} buttons={buttons}>
                <div className={`flex flex-col gap-1`}>
                    <Field title={"Nazwa"} value={name} setValue={setName} autoFocus={true} errorMsg={errorMsg['name']} setErrorMsg={(e: string) => setErrorMsg({ ...errorMsg, 'name': e })} maxLenght={50}/>
                    <Field title={"Opis"} value={description} setValue={setDescription} multiline={true} maxLenght={255}/>
                </div>
            </ModalContainer>
        );
    } else {
        return null;
    }
};

AddNewModal.displayName = 'AddNewModal';