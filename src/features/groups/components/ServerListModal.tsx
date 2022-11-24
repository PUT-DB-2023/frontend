import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { addDbAccounts } from '../api/addDbAccounts';

export const ServerListModal = ({ show, off, refetch, servers, groupId }: { show: boolean, off: () => void, refetch: () => void, servers : any, groupId: any }) => {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const handleOff = React.useCallback(() => {
        setName('');
        setDescription('');
        off();
    }, [])

    if (show) {
        return (
            <ModalContainer title='Tworzenie kont na serwerach' off={handleOff}>
                <div className={`flex flex-col gap-1 p-2`}>
                    {servers.map((server: any) => {
                        return (
                            <div className='w-full flex justify-between p-4 items-center rounded-lg'>
                                <span className='text-lg'> {server.name} </span>
                                <Button type={ButtonType.OUTLINE} text='Przenieś' onClick={() => addDbAccounts(groupId, server.id)} />
                            </div>
                        )
                    })}
                </div>
                <div className={`gap-2 mt-10 self-end justify-self-end`}>
                    <Button type={ButtonType.ACTION} text='Ok' onClick={handleOff} />
                </div>
            </ModalContainer>
        );
    } else {
        return null;
    }
};

ServerListModal.displayName = 'GroupListModal';