import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { updateServer } from '../api/updateServer';
import { Server } from '../types';

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

    React.useEffect(() => {
        setName(data.name);
        setIp(data.ip);
        setPort(data.port);
        setUser(data.user);
        setProvider(data.provider);
        setPassword(data.password);
        setDatabase(data.database);
        setActive(data.active);
    }, [show, data])

    const handleUpdate = React.useCallback(async () => {
        const res = await updateServer({ id: data.id, name, ip, port, provider, password, database, active } as Server)
        if (res.data) {
            off();
            refetch();
        }
    }, [name, data, name, ip, port, provider, user, password, database, active])

    const buttons = <>
        <Button type={ButtonType.OUTLINE} text='Anuluj' onClick={off} />
        <Button type={ButtonType.ACTION} text='Zapisz zmiany' onClick={handleUpdate} />
    </>

    if (show) {
        return (
            <ModalContainer title={data.name} off={off} buttons={buttons}>
                <div className={`flex flex-col gap-1`}>
                    <Field title={"Nazwa"} value={name} setValue={setName} autoFocus={true} />
                    <Field title={"IP"} value={ip} setValue={setIp} pattern={'^((25[0-5]|(2[0-4]|1\\d|[1-9]|)\\d)\.?\\b){4}$'} wrongText='Poprawny format IP to: X.X.X.X, gdzie X to liczba' />
                    <Field title={"Port"} value={port} setValue={setPort} pattern={'^[0-9]+$'} wrongText='Port musi mieć wartość numeryczną' />
                    <Field title={"Dostawca"} value={provider} setValue={setProvider} />
                    <Field title={"Użytkownik"} value={user} setValue={setUser} />
                    <Field title={"Hasło"} value={password} setValue={setPassword} type={'password'} />
                    <Field title={"Baza danych"} value={database} setValue={setDatabase} />
                    <div className='flex gap-2 items-center mt-4'>
                        Aktywny:
                        <input type="checkbox" checked={active} onChange={() => setActive(!active)} className="w-4 h-4 text-blue-600 accent-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"></input>
                    </div>
                </div>
            </ModalContainer>
        );
    } else {
        return null;
    }
};

EditModal.displayName = 'EditModal';