import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { updateGroup } from '../api/updateGroup'

interface IEditModal {
    show: boolean,
    off: () => void,
    refetch: () => void,
    data: any,
}

export const EditModal = ({ show, off, refetch, data }: IEditModal) => {
    const [name, setName] = React.useState('');
    const [day, setDay] = React.useState('');
    const [hour, setHour] = React.useState('');
    const [room, setRoom] = React.useState('');
    const [teacherEdition, setTeacherEdition] = React.useState('');
    const [students, setStudents] = React.useState([]);

    React.useEffect(() => {
        setName(data.name);
        setDay(data.day);
        setHour(data.hour);
        setRoom(data.room);
        setTeacherEdition(data.teacherEdition.id);
        setStudents(data.students);
    }, [show, data])

    const handleUpdate = React.useCallback(async () => {
        const studs = students.map((o: any) => String(o.id))
        const res = await updateGroup({name, day, hour, room, teacherEdition, students: studs, id: data.id});
        console.log(res)
        if (res) {
            off();
            refetch()
         }
    }, [name, day, hour, room, teacherEdition, students])

    if (show) {
        return (
            <ModalContainer title='Edytuj edycję' off={off}>
                <div className={`flex flex-col gap-1`}>
                    <Field title={"Nazwa"} value={name} setValue={setName} />
                    <Field title={"Dzień"} value={day} setValue={setDay} />
                    <Field title={"Godzina"} value={hour} setValue={setHour} />
                    <Field title={"Sala"} value={room} setValue={setRoom} />
                    <Field title={"Edycja nauczyciela"} value={teacherEdition} setValue={setTeacherEdition} />
                    <Field title={"Studenci"} value={students} setValue={setStudents} />
                </div>
                <div className={`flex gap-2 mt-10 self-end`}>
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