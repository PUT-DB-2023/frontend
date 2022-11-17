import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { addGroup } from '../api/addGroup';

export const AddNewModal = ({ show, off, refetch, teacherEditions }: { show: boolean, off: () => void, refetch: () => void, teacherEditions: {} }) => {
    const [name, setName] = React.useState('');
    const [day, setDay] = React.useState('');
    const [hour, setHour] = React.useState('');
    const [room, setRoom] = React.useState('');
    const [teacherEdition, setTeacherEdition] = React.useState('1');
    const [students, setStudents] = React.useState(['12', '13']);

    const handleOff = React.useCallback(() => {
        setName('');
        setDay('');
        setHour('');
        setRoom('');
        setTeacherEdition('1');
        setStudents(['12', '13']);
        off();
    }, [])

    const handleAdd = React.useCallback(async () => {
        const res = await addGroup({ name, day, hour, room, teacherEdition, students });
        if (res) {
            handleOff();
            refetch()
        }
    }, [name, day, hour, room, teacherEdition, students])

    if (show) {
        return (
            <ModalContainer title='Nowa grupa' off={handleOff}>
                <div className={`flex flex-col gap-1`}>
                    <Field title={"Nazwa"} value={name} setValue={setName} />
                    <Field title={"Dzień"} value={day} setValue={setDay} />
                    <Field title={"Godzina"} value={hour} setValue={setHour} />
                    <Field title={"Sala"} value={room} setValue={setRoom} />
                    <Field title={"Edycja nauczyciela"} value={teacherEdition} setValue={setTeacherEdition} />
                    <Field title={"Studenci"} value={students} setValue={setStudents} />
                </div>
                <div className={`flex gap-2 mt-10 self-end`}>
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