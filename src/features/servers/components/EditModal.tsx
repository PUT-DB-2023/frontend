import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { updateServer } from '../api/updateServer';
import { IServ } from '../api/updateServer'

interface IEditModal {
    show: boolean,
    off: () => void,
    refetch: () => void,
    data: IServ,
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
    
    React.useEffect(()=>{
        setName(data.name);
        setIp(data.ip);
        setPort(data.port);
        setUser(data.user);
        setProvider(data.provider);
        setPassword(data.password);
        setDatabase(data.database);
        setActive(data.active);
    },[show, data])
    
    const handleUpdate = React.useCallback(async () => {
        const res = await updateServer({id: data.id, name, ip, port, provider, password, database, active} as IServ)
        if (res.data) {
            off();
            refetch();
         } else {
         }
    }, [name, data, name, ip, port, provider, user, password, database, active])

    if (show) {
        return (
            <ModalContainer title={data.name} off={off}>
                <div className={`flex flex-col gap-1`}>
                <Field title={"Name"} value={name} setValue={setName} />
                    <Field title={"IP"} value={ip} setValue={setIp} />
                    <Field title={"Port"} value={port} setValue={setPort} />
                    <Field title={"Provider"} value={provider} setValue={setProvider} />
                    <Field title={"User"} value={user} setValue={setUser} />
                    <Field title={"Password"} value={password} setValue={setPassword} />
                    <Field title={"Database"} value={database} setValue={setDatabase} />
                    <div className='flex gap-2 items-center'>
                        Active:
                        <input type="checkbox" checked={active} onChange={() => setActive(!active)} className="w-4 h-4 text-blue-600 accent-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"></input>
                    </div>
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