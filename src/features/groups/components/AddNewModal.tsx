import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { addGroup } from '../api/addGroup';
import { useNavigate } from 'react-router-dom';
import { WeekDayDropDown } from 'components/WeekDayDropdown';
import { weekDays, WeekDay } from 'types';
import { TimeField } from 'components/TimeField';
import { useQuery } from 'react-query';
import { getTeachers } from '../api/getTeachers';
import { DropDown } from '../api/DropDown';
import { FieldBox } from 'components/FieldBox';
import { getTeacherEdtition } from '../api/getTeacherEdition';

export const AddNewModal = ({ show, off, refetch, edition }: { show: boolean, off: () => void, refetch: () => void, edition?: any }) => {
    const [name, setName] = React.useState('');
    const [day, setDay] = React.useState<WeekDay>(weekDays[0]);
    const [hour, setHour] = React.useState('08:00');
    const [room, setRoom] = React.useState('');
    const [teacher, setTeacher] = React.useState('');

    const { data: teacherEditionData, status: teacherEditionStatus, refetch: teacherEditionRefetch } = useQuery(['teacherEdition'], () => getTeacherEdtition(edition));

    const navigate = useNavigate()

    console.log(teacherEditionData)

    const handleOff = React.useCallback(() => {
        setName('');
        setDay(weekDays[0]);
        setHour('08:00');
        setRoom('');
        setTeacher('');
        off();
    }, [])

    const handleAdd = React.useCallback(async () => {
        const res = await addGroup({ name, day: day.field, hour, room, teacherEdition: teacherEditionData[0].id, students: [] });
        console.log(teacherEditionData)
        if (res) {
            handleOff()
            refetch()
            navigate(`/groups/${res.id}/`)
        }
    }, [name, day, hour, room, teacher])

    if (show) {
        return (
            <ModalContainer title='Nowa grupa' off={handleOff}>
                <div className={`flex flex-col gap-1`}>
                    <Field title={"Nazwa"} value={name} setValue={setName} />
                    <WeekDayDropDown title={'Dzień'} value={day} setValue={setDay} />
                    <TimeField title={"Godzina"} value={hour} setValue={setHour} />
                    <Field title={"Sala"} value={room} setValue={setRoom} />
                    <DropDown title={"Nauczyciel"} values={teacherEditionData} value={teacher} setValue={setTeacher} />
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