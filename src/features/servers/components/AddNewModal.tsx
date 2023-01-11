import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { addServer } from '../api/addServer';
import { useNavigate } from 'react-router-dom';
import { Server } from '../types';
import { objectMap } from 'api/objectMap';

export const AddNewModal = ({ show, off, refetch }: { show: boolean, off: () => void, refetch: () => void }) => {
    const [name, setName] = React.useState('');
    const [ip, setIp] = React.useState('');
    const [port, setPort] = React.useState('');
    const [provider, setProvider] = React.useState('');
    const [user, setUser] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [database, setDatabase] = React.useState('');
    const [active, setActive] = React.useState(false);
    const [create, setCreate] = React.useState('');
    const [modify, setModify] = React.useState('');
    const [remove, setRemove] = React.useState('');
    const [nameCodes, setNameCodes] = React.useState('');
    const defaultMsg = { name: '', ip: '', port: '', provider: '', user: '', password: '', database: '', create: '', modify: '', remove: '', nameCodes: '' }
    const [errorMsg, setErrorMsg] = React.useState(defaultMsg);

    const navigate = useNavigate()

    const validate = React.useCallback(() => {
        let correct = true;

        if (name.length === 0) {
            setErrorMsg(prevState => ({ ...prevState, 'name': 'Pole wymagane' }));
            correct = false;
        }

        if (ip.length === 0) {
            setErrorMsg(prevState => ({ ...prevState, 'ip': 'Pole wymagane' }));
            correct = false;
        }

        if (port.length === 0) {
            setErrorMsg(prevState => ({ ...prevState, 'port': 'Pole wymagane' }));
            correct = false;
        }

        if (provider.length === 0) {
            setErrorMsg(prevState => ({ ...prevState, 'provider': 'Pole wymagane' }));
            correct = false;
        }

        if (user.length === 0) {
            setErrorMsg(prevState => ({ ...prevState, 'user': 'Pole wymagane' }));
            correct = false;
        }

        if (password.length === 0) {
            setErrorMsg(prevState => ({ ...prevState, 'password': 'Pole wymagane' }));
            correct = false;
        }

        if (database.length === 0) {
            setErrorMsg(prevState => ({ ...prevState, 'database': 'Pole wymagane' }));
            correct = false;
        }

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
    }, [name, ip, port, provider, user, password, database, create, modify, remove, nameCodes,errorMsg])

    const handleOff = React.useCallback(() => {
        setName('')
        setIp('')
        setPort('')
        setProvider('')
        setUser('')
        setPassword('')
        setDatabase('')
        setCreate('')
        setModify('')
        setRemove('')
        setNameCodes('')
        setActive(false)
        setErrorMsg(defaultMsg)
        off()
    }, [])

    const handleAdd = React.useCallback(async () => {
        if (!validate()) { return; }
        const res = await addServer({ name, ip, port, provider, user, password, database, active, create_user_template: create, modify_user_template: modify, delete_user_template: remove, username_template: nameCodes } as Server)
        if (res) {
            handleOff();
            refetch();
            navigate(`${res.id}/`)
        }
    }, [name, ip, port, provider, user, password, database, active, create, modify, remove, nameCodes])

    const buttons = <>
        <Button type={ButtonType.TEXT_ACTION} text='Anuluj' onClick={handleOff} />
        <Button type={ButtonType.ACTION} text='Dodaj' onClick={handleAdd} />
    </>

    if (show) {
        return (
            <ModalContainer title='Nowy server' off={handleOff} buttons={buttons}>
                <div className={`flex flex-col gap-1`}>
                    <div className='flex gap-2 items-center px-4 mb-4'>
                        <input type="checkbox" checked={active} onChange={() => setActive(!active)} className="w-4 h-4 text-blue-600 accent-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"></input>
                        Aktywny
                    </div>
                    <Field title={"Nazwa"} value={name} setValue={setName} autoFocus={true} errorMsg={errorMsg['name']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'name': e }))} maxLenght={50} />
                    <div className='flex justify-between'>
                        <Field title={"IP"} value={ip} setValue={setIp} errorMsg={errorMsg['ip']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'ip': e }))} maxLenght={30} />
                        <Field title={"Port"} value={port} setValue={setPort} pattern={'^[0-9]+$'} wrongText='Port musi mieć wartość numeryczną' errorMsg={errorMsg['port']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'port': e }))} maxLenght={30} />
                    </div>
                    <Field title={"Dostawca"} value={provider} setValue={setProvider} errorMsg={errorMsg['provider']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'provider': e }))} maxLenght={30} />
                    <Field title={"Użytkownik"} value={user} setValue={setUser} errorMsg={errorMsg['user']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'user': e }))} maxLenght={30} />
                    <Field title={"Hasło"} type={'password'} value={password} setValue={setPassword} errorMsg={errorMsg['password']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'password': e }))} maxLenght={30} />
                    <Field title={"Baza danych"} value={database} setValue={setDatabase} errorMsg={errorMsg['database']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'database': e }))} maxLenght={30} />

                    <hr className='w-full my-6 border-1 border-zinc-300'></hr>
                    <Field title={"Szablon polecenia tworzenia"} value={create} setValue={setCreate} errorMsg={errorMsg['create']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'create': e }))} maxLenght={255} />
                    <Field title={"Szablon polecenia modyfikowania"} value={modify} setValue={setModify} errorMsg={errorMsg['modify']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'modify': e }))} maxLenght={255} />
                    <Field title={"Szablon polecenia usuwania"} value={remove} setValue={setRemove} errorMsg={errorMsg['remove']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'remove': e }))} maxLenght={255} />

                    <hr className='w-full my-6 border-1 border-zinc-300'></hr>
                    <Field title={"Szablon nazewnictwa kont"} value={nameCodes} setValue={setNameCodes} errorMsg={errorMsg['nameCodes']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'nameCodes': e }))} maxLenght={255} />
                </div>
            </ModalContainer>
        );
    } else {
        return null;
    }
};

AddNewModal.displayName = 'AddNewModal';