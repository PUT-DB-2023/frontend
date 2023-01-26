import { Button } from 'components/Button';
import { clsTextWrong } from 'components/FieldBox';
import { ModalContainer } from 'components/ModalContainer';
import { queryClient } from 'lib/react-query';
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
    const defaultMsg = ''
    const [errorMsg, setErrorMsg] = React.useState(defaultMsg);
    let resLocal = false
    let resServer = false

    const validate = React.useCallback(() => {
        let correct = true;

        if (!removeLocal && !removeFromServer) {
            setErrorMsg('Wybierz przynajmniej jedną opcję');
            correct = false;
        }

        return correct;
    }, [removeLocal, removeFromServer])

    const handleOff = React.useCallback(() => {
        queryClient.refetchQueries('user')
        setRemoveLocal(false)
        setRemoveFromServer(false)
        setErrorMsg(defaultMsg);
        off();
    }, [])

    const handleRemove = React.useCallback(async () => {
        if (!validate()) { return; }
        if (removeFromServer) {
            resServer = await removeDBAccountFromServer(dbAccount?.id);
        }

        if (removeLocal) {
            resLocal = await removeDBAccountLocal(dbAccount?.id);
        }

        console.log(removeFromServer, resServer, removeLocal, resLocal);
        
        
        if ((removeFromServer && resServer) || (removeLocal && resLocal)) {
            handleOff();
        }
    }, [dbAccount, removeLocal, removeFromServer])

    const buttons = <>
        <Button type={ButtonType.TEXT_WARNING} text='Anuluj' onClick={off} />
        <Button type={ButtonType.WARNING} text='Usuń' onClick={handleRemove} />
    </>

    if (show) {
        return (
            <ModalContainer title={`Usuń konto "${dbAccount?.editionServer?.server?.name}"`} off={handleOff} buttons={buttons}>
                <div className='flex flex-col gap-1 px-4'>
                    <div className='flex gap-2 items-center mb-4'>
                        <input type="checkbox" checked={removeLocal} onChange={() => setRemoveLocal(!removeLocal)} className="w-4 h-4 text-blue-600 accent-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"></input>
                        Usuń lokalną reprezentację konta
                    </div>
                    <div className={`flex gap-2 items-center mb-4 ${!dbAccount?.is_moved ? 'text-zinc-400' : ''}`}>
                        <input type="checkbox" disabled={!dbAccount?.is_moved} checked={removeFromServer} onChange={() => setRemoveFromServer(!removeFromServer)} className="w-4 h-4 text-blue-600 accent-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"></input>
                        Usuń z serwera bazodanowego
                    </div>
                    {errorMsg && errorMsg?.length > 0 && <span className={clsTextWrong}>{errorMsg}</span>}
                </div>
            </ModalContainer>
        );
    } else {
        return null;
    }
};

RemoveDBAccountModal.displayName = 'RemoveDBAccountModal';