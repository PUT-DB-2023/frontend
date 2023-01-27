import { Button } from 'components/Button';
import { InfoBox } from 'components/InfoBox';
import { ModalContainer } from 'components/ModalContainer';
import { Server } from 'features/servers';
import { ButtonType } from 'types';
import { addDbAccounts } from '../api/addDbAccounts';

interface IServerListModal {
    show: boolean,
    off: () => void,
    refetch: () => void,
    servers: any,
    editionId: string,
    groupId: any,
    allAccountsMoved: boolean,
}

export const ServerListModal = ({ show, off, refetch, servers, groupId, editionId, allAccountsMoved }: IServerListModal) => {
    const buttons = <>
        <Button type={ButtonType.ACTION} text='Ok' onClick={() => handleOff()} />
    </>

    const warningButton = <>
        <Button type={ButtonType.OUTLINE} text='Ok' onClick={() => handleOff()} />
    </>

    const handleOff = async () => {
        await refetch()
        off()
    }

    if (show) {
        if (servers.length === 0) {
            return (
                <ModalContainer title='Nie można utworzyć kont bazodanowych' off={() => handleOff()} buttons={warningButton}>
                    Edycja nie posiada serwerów. Dodaj serwery aby tworzyć konta bazodanowe.
                </ModalContainer>
            )
        }
        if (allAccountsMoved) {
            return (
                <ModalContainer title='Nie można utworzyć kont bazodanowych' off={() => handleOff()} buttons={warningButton}>
                    Brak kont to utworzenia lub wszystkie konta zostały już utworzone.
                </ModalContainer>
            )
        }
        else {
            return (
                <ModalContainer title='Tworzenie kont na serwerach' off={() => handleOff()} buttons={buttons}>
                    <div className='flex flex-col gap-8'>
                        <InfoBox>
                            Ta operacja tworzy konta bazodanowe na wybranym serwerze zgodnie z utworzonym wcześniej szablonem konta.
                        </InfoBox>
                        <div className={`flex flex-col gap-1 p-2`}>
                            {servers.map((server: Server) => {
                                return (
                                    <div className='w-full flex justify-between p-4 items-center rounded-lg hover:bg-zinc-50' key={server.id}>
                                        <span className='text-lg'> {server.name} </span>
                                        <Button type={ButtonType.ACTION} text='Utwórz konta' onClick={() => addDbAccounts(editionId, groupId, server.id)} />
                                    </div>
                                )
                            })}
                        </div>
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