import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType, TeacherEdition } from 'types';
import { updateGroup } from '../api/updateGroup';
import { WeekDayDropDown } from 'components/WeekDayDropdown';
import { weekDays, WeekDay } from 'types';
import { TimeField } from 'components/TimeField';
import { DropDown } from '../api/DropDown';
import { useQuery } from 'react-query';
import { getTeacherEdtition } from '../api/getTeacherEdition';
import { Group } from '../types';
import { objectMap } from 'api/objectMap';

interface IEditModal {
    show: boolean,
    off: () => void,
    refetch: () => void,
    data: Group,
}

export const EditModal = ({ show, off, refetch, data }: IEditModal) => {
    const [name, setName] = React.useState('');
    const [day, setDay] = React.useState<WeekDay>(weekDays[0]);
    const [hour, setHour] = React.useState('08:00');
    const [room, setRoom] = React.useState('');
    const [teacher, setTeacher] = React.useState<TeacherEdition>();
    const defaultMsg = { name: '', teacher: '' }
    const [errorMsg, setErrorMsg] = React.useState(defaultMsg);

    const { data: teacherEditionData, status: teacherEditionStatus, refetch: teacherEditionRefetch } = useQuery(['teacherEdition', show], () => getTeacherEdtition(data.teacherEdition.edition.id));

    const validate = React.useCallback(() => {
        let correct = true;

        if (name.length === 0) {
            setErrorMsg(prevState => ({ ...prevState, 'name': 'Pole wymagane' }));
            correct = false;
        }

        if (!teacher) {
            setErrorMsg(prevState => ({ ...prevState, 'teacher': 'Pole wymagane' }));
            correct = false;
        }

        let sum = 0;
        objectMap(errorMsg, (v: any) => sum += v.length)

        return correct && sum === 0;
    }, [name, teacher, errorMsg])

    React.useEffect(() => {
        const findDay = weekDays.find(e => e.field === data?.day);
        const day: WeekDay = findDay ? findDay : weekDays[0];
        const time = data?.hour.split(':')
        const hour = time[0].length === 2 ? time[0] : '0' + time[0];
        const min = time.length !== 1 ? time[1] : '00';
        const newTime = hour + ':' + min;
        const selectedTeacher = teacherEditionData?.find((e: TeacherEdition) => e.teacher.id === data?.teacherEdition?.teacher?.id);

        setName(data?.name);
        setDay(day);
        setHour(newTime);
        setRoom(data?.room);
        setTeacher(selectedTeacher);
        setErrorMsg(defaultMsg);
    }, [show, data, teacherEditionData, teacherEditionStatus])

    React.useEffect(() => setErrorMsg(defaultMsg), [data, show])

    const handleUpdate = React.useCallback(async () => {
        if (!validate()) { return; }

        const res = await updateGroup({ name, day: day.field, hour, room, teacherEdition: teacher?.id!, id: data.id });
        if (res) {
            off();
            refetch()
        }
    }, [name, day, hour, room, teacher])

    const buttons = <>
        <Button type={ButtonType.TEXT_ACTION} text='Anuluj' onClick={off} />
        <Button type={ButtonType.ACTION} text='Zapisz' onClick={handleUpdate} />
    </>

    if (teacherEditionStatus === 'loading') {
        return null
    }

    if (show) {
        return (
            <ModalContainer title='Edytuj grupę' off={off} buttons={buttons}>
                <div className={`flex flex-col gap-1`}>
                    <Field title={"Nazwa"} value={name} setValue={setName} autoFocus={true} errorMsg={errorMsg['name']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'name': e }))} maxLenght={50} />
                    <div className='flex justify-between'>
                        <WeekDayDropDown title={'Dzień'} value={day} setValue={setDay} />
                        <TimeField title={"Godzina"} value={hour} setValue={setHour} />
                    </div>
                    <Field title={"Sala"} value={room} setValue={setRoom} maxLenght={30} />
                    <DropDown title={"Nauczyciel"} values={teacherEditionData} value={teacher} setValue={setTeacher} errorMsg={errorMsg['teacher']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'teacher': e }))} />
                </div>
            </ModalContainer>
        );
    } else {
        return null;
    }
};

EditModal.displayName = 'EditModal';