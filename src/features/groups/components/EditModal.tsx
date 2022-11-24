import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { updateGroup } from '../api/updateGroup';
import { WeekDayDropDown } from 'components/WeekDayDropdown';
import { weekDays, WeekDay } from 'types';
import { TimeField } from 'components/TimeField';
import { FieldBox } from 'components/FieldBox';
import { DropDown } from '../api/DropDown';
import { useQuery } from 'react-query';
import { getTeachers } from '../api/getTeachers';


interface IEditModal {
    show: boolean,
    off: () => void,
    refetch: () => void,
    data: any,
}

export const EditModal = ({ show, off, refetch, data }: IEditModal) => {
    const [name, setName] = React.useState('');
    const [day, setDay] = React.useState<WeekDay>(weekDays[0]);
    const [hour, setHour] = React.useState('08:00');
    const [room, setRoom] = React.useState('');
    const [teacher, setTeacher] = React.useState('');

    const { data: teachers, status: teachersStatus, refetch: teachersRefetch } = useQuery(['teachers'], getTeachers);

    React.useEffect(() => {
        const findDay = weekDays.find(e => e.field === data?.day);
        const day: WeekDay = findDay ? findDay : weekDays[0];
        const time = data?.hour.split(':')
        const hour = time[0].length === 2 ? time[0] : '0' + time[0];
        const min = time.length !== 1 ? time[1] : '00';
        const newTime = hour + ':' + min;
        const selectedTeacher = teachers?.find((e: any) => e.id === data?.teacherEdition?.teacher?.id);
        setName(data?.name);
        setDay(day);
        setHour(newTime);
        setRoom(data?.room);
        setTeacher(selectedTeacher);
    }, [show, data, teachers])

    const handleUpdate = React.useCallback(async () => {
        const res = await updateGroup({ name, day: day.field, hour, room, teacherEdition: '', id: data.id });
        if (res) {
            off();
            refetch()
        }
    }, [name, day, hour, room, teacher])

    if (show) {
        return (
            <ModalContainer title='Edytuj grupę' off={off}>
                <div className={`flex flex-col gap-1`}>
                    <Field title={"Nazwa"} value={name} setValue={setName} />
                    <WeekDayDropDown title={'Dzień'} value={day} setValue={setDay} />
                    <TimeField title={"Godzina"} value={hour} setValue={setHour} />
                    <Field title={"Sala"} value={room} setValue={setRoom} />
                    <DropDown title={"Nauczyciel"} values={teachers} value={teacher} setValue={setTeacher} />            </div>
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