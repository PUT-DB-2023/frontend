import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { updateServer } from '../api/updateServer'; import { Server } from '../types';
import { InfoBox } from 'components/InfoBox';
import { objectMap } from 'api/objectMap';

interface IEditModal {
    show: boolean,
    off: () => void,
    refetch: () => void,
    data: Server,
}

export const infoText = (<>
    Obsługiwane przez system parametry:<br />
    <ul style={{ listStyle: 'disc', listStylePosition: 'inside' }}>
        <li><b>arg_username</b> - nazwa konta użytkownika</li>
        <li><b>arg_password</b> - hasło konta użytkownika</li>
        <li><b>arg_database</b> - nazwa schematu</li>
        <li><b>arg_host</b> - host serwera</li>
        <li><b>arg_port</b> - port serwera</li>
    </ul>
    <br />
    System obsługuje możliwość wprowadzenia wielu komend jako szablon. Należy wtedy oddzielić od siebie te komendy używając ';'.
    <br />
    Jeżeli w szablonie znajdują się cudzysłowy (") poprzedź je znakiem backslash'a (\), np. \"%s\".
    <br /><br />
    Przykład:<br />
    <i>CREATE USER arg_username IDENTIFIED BY arg_password; GRANT CREATE TYPE, CREATE TABLE TO arg_username;</i>
</>);

export const infoTextNames = (<>
    Zdefiniowane zostały następujące nazwy:<br />
    <ul style={{ listStyle: 'disc', listStylePosition: 'inside' }}>
        <li>imie, imię</li>
        <li>nazwisko</li>
        <li>nr_indeksu, numer_indeksu, nr_ind, indeks</li>
        <li>e-mail</li>
    </ul>
    <br />
    Przykład:<br />
    <i>NAZWISKO_NR_INDEKSU</i> (generuje to przykładową nazwę użytkownika: walczak_100140)
</>);

export const EditCodesModal = ({ show, off, refetch, data }: IEditModal) => {
    const [create, setCreate] = React.useState('');
    const [modify, setModify] = React.useState('');
    const [remove, setRemove] = React.useState('');
    const [nameCodes, setNameCodes] = React.useState('');
    const defaultMsg = { create: '', modify: '', remove: '', nameCodes: '' }
    const [errorMsg, setErrorMsg] = React.useState(defaultMsg);

    React.useEffect(() => {
        setCreate(data?.create_user_template);
        setModify(data?.modify_user_template);
        setRemove(data?.delete_user_template);
        setNameCodes(data?.username_template);
        setErrorMsg(defaultMsg);
    }, [show, data])

    const validate = React.useCallback(() => {
        let correct = true;

        if (create.length === 0) {
            setErrorMsg(prevState => ({ ...prevState, 'create': 'Pole wymagane' }));
            correct = false;
        }

        if (modify.length === 0) {
            setErrorMsg(prevState => ({ ...prevState, 'modify': 'Pole wymagane' }));
            correct = false;
        }

        if (remove.length === 0) {
            setErrorMsg(prevState => ({ ...prevState, 'remove': 'Pole wymagane' }));
            correct = false;
        }

        if (nameCodes.length === 0) {
            setErrorMsg(prevState => ({ ...prevState, 'nameCodes': 'Pole wymagane' }));
            correct = false;
        }

        let sum = 0;
        objectMap(errorMsg, (v: any) => sum += v.length)

        return correct && sum === 0;
    }, [create, modify, remove, nameCodes, errorMsg])

    const handleUpdate = React.useCallback(async () => {
        if (!validate()) { return; }
        const res = await updateServer({ id: data.id, create_user_template: create, modify_user_template: modify, delete_user_template: remove, username_template: nameCodes } as Server)
        if (res) {
            off();
            refetch();
        }
    }, [data, create, modify, remove, nameCodes])

    const buttons = <>
        <Button type={ButtonType.TEXT_ACTION} text='Anuluj' onClick={off} />
        <Button type={ButtonType.ACTION} text='Zapisz' onClick={handleUpdate} />
    </>

    if (show) {
        return (
            <ModalContainer title={data.name} off={off} buttons={buttons}>
                <div className={`flex flex-col gap-1`}>
                    <InfoBox>{infoText}</InfoBox>
                    <hr className='w-full my-6 border-1 border-zinc-300'></hr>
                    <Field title={"Szablon polecenia tworzenia"} multiline={true} value={create} setValue={setCreate} errorMsg={errorMsg['create']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'create': e }))} maxLenght={1023} />
                    <Field title={"Szablon polecenia modyfikowania"} multiline={true} value={modify} setValue={setModify} errorMsg={errorMsg['modify']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'modify': e }))} maxLenght={1023} />
                    <Field title={"Szablon polecenia usuwania"} multiline={true} value={remove} setValue={setRemove} errorMsg={errorMsg['remove']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'remove': e }))} maxLenght={1023} />
                    <hr className='w-full my-6 border-1 border-zinc-300'></hr>
                    <InfoBox>{infoTextNames}</InfoBox>
                    <Field title={"Szablon nazewnictwa kont"} multiline={true} value={nameCodes} setValue={setNameCodes} errorMsg={errorMsg['nameCodes']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'nameCodes': e }))} maxLenght={1023} />
                </div>
            </ModalContainer>
        );
    } else {
        return null;
    }
};

EditCodesModal.displayName = 'EditCodesModal';