import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { addDbAccounts } from '../api/addDbAccounts';
import e from 'express';

export const ServerListModal = ({ show, off, refetch, servers, groupId }: { show: boolean, off: () => void, refetch: () => void, servers: any, groupId: any }) => {
    const buttons = <>
        <Button type={ButtonType.ACTION} text='Ok' onClick={off} />
    </>

    const warningButton = <>
        <Button type={ButtonType.OUTLINE} text='Ok' onClick={off} />
    </>

    if (show) {
        if (servers.length === 0) {
            return (
                <ModalContainer title='Nie można utworzyć kont bazodanowych' off={off} buttons={warningButton}>
                    Edycja nie posiada serwerów. Dodaj serwery aby tworzyć kontabazodanowe.
                </ModalContainer>
            )
        }
        else {
            return (
                <ModalContainer title='Tworzenie kont na serwerach' off={off} buttons={buttons}>
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
                </ModalContainer>
            );
        } 
    }
    else {
        return null
    }
};

ServerListModal.displayName = 'GroupListModal';