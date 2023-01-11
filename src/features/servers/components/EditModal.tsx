import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { updateServer } from '../api/updateServer';
import { Server } from '../types';
import { objectMap } from 'api/objectMap';

interface IEditModal {
    show: boolean,
    off: () => void,
    refetch: () => void,
    data: Server,
}

export const EditModal = ({ show, off, refetch, data }: IEditModal) => {
    const [name, setName] = React.useState('');
    const [ip, setIp] = React.useState('');
    const [port, setPort] = React.useState('');
    const [provider, setProvider] = React.useState('');
    const [user, setUser] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [database, setDatabase] = React.useState('');
    const [active, setActive] = React.useState(false);
    const defaultMsg = { name: '', ip: '', port: '', provider: '', user: '', password: '', database: '' }
    const [errorMsg, setErrorMsg] = React.useState(defaultMsg);

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

        let sum = 0;
        objectMap(errorMsg, (v: any) => sum += v.length)

        return correct && sum === 0;
    }, [name, ip, port, provider, user, password, database, errorMsg])

    React.useEffect(() => {
        setName(data.name);
        setIp(data.ip);
        setPort(data.port);
        setUser(data.user);
        setProvider(data.provider);
        setPassword(data.password);
        setDatabase(data.database);
        setActive(data.active);
        setErrorMsg(defaultMsg);
    }, [show, data])

    const handleUpdate = React.useCallback(async () => {
        if (!validate()) { return; }
        const res = await updateServer({ id: data.id, name, ip, port, provider, user, password, database, active } as Server)
        if (res) {
            off();
            refetch();
        }
    }, [name, data, name, ip, port, provider, user, password, database, active])

    const buttons = <>
        <Button type={ButtonType.TEXT_ACTION} text='Anuluj' onClick={off} />
        <Button type={ButtonType.ACTION} text='Zapisz' onClick={handleUpdate} />
    </>

    if (show) {
        return (
            <ModalContainer title={data.name} off={off} buttons={buttons}>
                <div className={`flex flex-col gap-1`}>
                    <div className='flex gap-2 items-center px-4 mb-4'>
                        <input type="checkbox" checked={active} onChange={() => setActive(!active)} className="w-4 h-4 text-blue-600 accent-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"></input>
                        Aktywny
                    </div>
                    <Field title={"Nazwa"} value={name} setValue={setName} autoFocus={true} errorMsg={errorMsg['name']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'name': e }))} maxLenght={255} />
                    <div className='flex justify-between'>
                        <Field title={"IP"} value={ip} setValue={setIp} errorMsg={errorMsg['ip']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'ip': e }))} maxLenght={30} />
                        <Field title={"Port"} value={port} setValue={setPort} pattern={'^[0-9]+$'} wrongText='Port musi mieć wartość numeryczną' errorMsg={errorMsg['port']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'port': e }))} maxLenght={30} />
                    </div>
                    <Field title={"Dostawca"} value={provider} setValue={setProvider} errorMsg={errorMsg['provider']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'provider': e }))} maxLenght={30} />
                    <Field title={"Użytkownik"} value={user} setValue={setUser} errorMsg={errorMsg['user']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'user': e }))} maxLenght={30} />
                    <Field title={"Hasło"} type={'password'} value={password} setValue={setPassword} errorMsg={errorMsg['password']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'password': e }))} maxLenght={30} />
                </div>
            </ModalContainer>
        );
    } else {
        return null;
    }
};

EditModal.displayName = 'EditModal';