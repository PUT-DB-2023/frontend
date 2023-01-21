import { Button } from 'components/Button';
import { ModalContainer } from 'components/ModalContainer';
import * as React from 'react';
import { ButtonType, DbAccount } from 'types';
import { removeDBAccountLocal } from '../api/removeDBAccountLocal';
import { removeDBAccountFromServer } from '../api/removeDBAcountFromServer';

interface IRemoveModal {
    show: boolean,
    off: () => void,
    dbAccount: DbAccount | undefined;
}

export const RemoveDBAccountModal = ({ show, off, dbAccount }: IRemoveModal) => {
    const [removeLocal, setRemoveLocal] = React.useState(false)
    const [removeFromServer, setRemoveFromServer] = React.useState(false)
    let resLocal = false
    let resServer = false

    const handleRemove = React.useCallback(async () => {
        if (removeFromServer) {
            resServer = await removeDBAccountFromServer(dbAccount?.id);
        }

        if (removeLocal) {
            resServer = await removeDBAccountLocal(dbAccount?.id);
        }
        
        if ((removeFromServer && resServer) || (removeLocal && resLocal)) {
            off();
        }
    }, [dbAccount, removeLocal, removeFromServer])

    const buttons = <>
        <Button type={ButtonType.TEXT_WARNING} text='Anuluj' onClick={off} />
        <Button type={ButtonType.WARNING} text='Usuń' onClick={handleRemove} />
    </>

    if (show) {
        return (
            <ModalContainer title={`Usuń konto "${dbAccount?.editionServer?.server?.name}"`} off={off} buttons={buttons}>
                <div className='flex flex-col gap-1'>
                    <div className='flex gap-2 items-center px-4 mb-4'>
                        <input type="checkbox" checked={removeLocal} onChange={() => setRemoveLocal(!removeLocal)} className="w-4 h-4 text-blue-600 accent-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"></input>
                        Usuń lokalną reprezentację konta
                    </div>
                    <div className={`flex gap-2 items-center px-4 mb-4 ${!dbAccount?.is_moved ? 'text-zinc-400' : ''}`}>
                        <input type="checkbox" disabled={!dbAccount?.is_moved} checked={removeFromServer} onChange={() => setRemoveFromServer(!removeFromServer)} className="w-4 h-4 text-blue-600 accent-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"></input>
                        Usuń z serwera bazodanowego
                    </div>
                </div>
            </ModalContainer>
        );
    } else {
        return null;
    }
};

RemoveDBAccountModal.displayName = 'RemoveDBAccountModal';