import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { addServer } from '../api/addServer';
import { showToast } from 'api/showToast';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

export const AddNewModal = ({ show, off, refetch }: { show: boolean, off: () => void, refetch: () => void }) => {
    const [name, setName] = React.useState('');
    const [ip, setIp] = React.useState('');
    const [port, setPort] = React.useState('');
    const [provider, setProvider] = React.useState('');
    const [user, setUser] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [database, setDatabase] = React.useState('');
    const [active, setActive] = React.useState(false);

    const navigate = useNavigate()

    const handleOff = React.useCallback(() => {
        setName('');
        setIp('')
        setPort('')
        setProvider('')
        setUser('')
        setPassword('')
        setDatabase('')
        setActive(false)
        off();
    }, [])

    const handleAdd = React.useCallback(async () => {
        let data = { name, ip, port, provider, user, password, database, active }
        const res = await addServer(data)
        if (res.data) {
            handleOff();
            refetch();
            navigate(`${res.data.id}/`)
        } else {
        }
    }, [name, ip, port, provider, user, password, database, active])

    if (show) {
        return (
            <ModalContainer title='Nowy server' off={handleOff}>
                <div className={`flex flex-col gap-1`}>
                    <Field title={"Nazwa"} value={name} setValue={setName} />
                    <Field title={"IP"} value={ip} setValue={setIp} />
                    <Field title={"Port"} value={port} setValue={setPort} />
                    <Field title={"Dostawca"} value={provider} setValue={setProvider} />
                    <Field title={"Użytkownik"} value={user} setValue={setUser} />
                    <Field title={"Hasło"} type={'password'} value={password} setValue={setPassword} />
                    <Field title={"Baza danych"} value={database} setValue={setDatabase} />
                    {/* <Field title={"Active"} value={active} setValue={active} /> */}
                    <div className='flex gap-2 items-center'>
                        Aktywny:
                        <input type="checkbox" checked={active} onChange={() => setActive(!active)} className="w-4 h-4 text-blue-600 accent-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"></input>
                    </div>
                </div>
                <div className={`flex flex-wrap gap-2 mt-10`}>
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