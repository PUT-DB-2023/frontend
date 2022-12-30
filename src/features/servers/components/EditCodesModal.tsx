import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { updateServer } from '../api/updateServer'; import { Server } from '../types';
import { InfoBox } from 'components/InfoBox';

interface IEditModal {
    show: boolean,
    off: () => void,
    refetch: () => void,
    data: Server,
}

export const EditCodesModal = ({ show, off, refetch, data }: IEditModal) => {
    const [create, setCreate] = React.useState('');
    const [modify, setModify] = React.useState('');
    const [remove, setRemove] = React.useState('');
    const [name, setName] = React.useState('');

    React.useEffect(() => {
        setCreate(data?.create_user_template);
        setModify(data?.modify_user_template);
        setRemove(data?.delete_user_template)
        setName(data?.username_template);
    }, [show, data])

    const handleUpdate = React.useCallback(async () => {
        const res = await updateServer({ id: data.id, create_user_template: create, modify_user_template: modify, delete_user_template: remove, username_template: name } as Server)
        if (res) {
            off();
            refetch();
        }
    }, [data, create, modify, remove, name])

    const buttons = <>
        <Button type={ButtonType.TEXT_ACTION} text='Anuluj' onClick={off} />
        <Button type={ButtonType.ACTION} text='Zapisz' onClick={handleUpdate} />
    </>

    const infoText = (<>W celu wprowadzenia zmiennej użyj %s.<br/>
        Jeżeli w szablonie znajdują się cudzysłowy (") poprzedź je znakiem backslash'a (\), np. \"%s\"".
    </>);

    if (show) {
        return (
            <ModalContainer title={data.name} off={off} buttons={buttons}>
                <div className={`flex flex-col gap-1`}>
                    <InfoBox>{infoText}</InfoBox>
                    <Field title={"Tworzenie"} value={create} setValue={setCreate} autoFocus={true} />
                    <Field title={"Modyfikacja"} value={modify} setValue={setModify} />
                    <Field title={"Usuwanie"} value={remove} setValue={setRemove} />
                    <Field title={"Nazewnictwo kont"} value={name} setValue={setName} />
                </div>
            </ModalContainer>
        );
    } else {
        return null;
    }
};

EditCodesModal.displayName = 'EditCodesModal';