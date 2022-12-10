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
import { DropDown } from '../api/DropDown';
import { getTeacherEdtition } from '../api/getTeacherEdition';

export const AddNewModal = ({ show, off, refetch, edition }: { show: boolean, off: () => void, refetch: () => void, edition?: any }) => {
    console.log(edition);

    const [name, setName] = React.useState('');
    const [day, setDay] = React.useState<WeekDay>(weekDays[0]);
    const [hour, setHour] = React.useState('08:00');
    const [room, setRoom] = React.useState('');
    const [teacher, setTeacher] = React.useState('');

    const { data: teacherEditionData, status: teacherEditionStatus, refetch: teacherEditionRefetch } = useQuery(['teacherEdition'], () => getTeacherEdtition(edition));

    const navigate = useNavigate()

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
        if (res) {
            handleOff()
            refetch()
            navigate(`/groups/${res.id}/`)
        }
    }, [name, day, hour, room, teacher])

    const buttons = <>
        <Button type={ButtonType.OUTLINE} text='Anuluj' onClick={handleOff} />
        <Button type={ButtonType.ACTION} text='Dodaj' onClick={handleAdd} />
    </>

    if (teacherEditionStatus === 'loading') {
        return null
    }

    if (show) {
        console.log(teacherEditionData);

        if (teacherEditionData.length === 0) {
            return (
                <ModalContainer title='NIE DZIALA' off={handleOff}>

                </ModalContainer>
            )
        }
        else {
            return (
                <ModalContainer title='Nowa grupa' off={handleOff} buttons={buttons}>
                    <div className={`flex flex-col gap-1`}>
                        <Field title={"Nazwa"} value={name} setValue={setName} />
                        <WeekDayDropDown title={'Dzień'} value={day} setValue={setDay} />
                        <TimeField title={"Godzina"} value={hour} setValue={setHour} />
                        <Field title={"Sala"} value={room} setValue={setRoom} />
                        <DropDown title={"Nauczyciel"} values={teacherEditionData} value={teacher} setValue={setTeacher} />
                    </div>
                </ModalContainer>
            );
        }
    } else {
        return null;
    }
};

AddNewModal.displayName = 'AddNewModal';