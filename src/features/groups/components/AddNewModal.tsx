import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType, TeacherEdition } from 'types';
import { addGroup } from '../api/addGroup';
import { useNavigate } from 'react-router-dom';
import { WeekDayDropDown } from 'components/WeekDayDropdown';
import { weekDays, WeekDay } from 'types';
import { TimeField } from 'components/TimeField';
import { useQuery } from 'react-query';
import { DropDown } from '../api/DropDown';
import { getTeacherEdtition } from '../api/getTeacherEdition';
import { objectMap } from 'api/objectMap';

export const AddNewModal = ({ show, off, refetch, edition }: { show: boolean, off: () => void, refetch: () => void, edition?: any }) => {
    const [name, setName] = React.useState('');
    const [day, setDay] = React.useState<WeekDay>(weekDays[0]);
    const [hour, setHour] = React.useState('08:00');
    const [room, setRoom] = React.useState('');
    const [teacher, setTeacher] = React.useState<TeacherEdition>();
    const defaultMsg = { name: '', teacher: '' }
    const [errorMsg, setErrorMsg] = React.useState(defaultMsg);

    const { data: teacherEditionData, status: teacherEditionStatus, refetch: teacherEditionRefetch } = useQuery(['teacherEdition', show], () => getTeacherEdtition(edition));

    const navigate = useNavigate();

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

    const handleOff = React.useCallback(() => {
        setName('');
        setDay(weekDays[0]);
        setHour('08:00');
        setRoom('');
        setTeacher(undefined);
        setErrorMsg(defaultMsg);
        off();
    }, [])

    const handleAdd = React.useCallback(async () => {
        if (!validate()) { return; }
        const res = await addGroup({ name, day: day.field, hour, room, teacherEdition: teacher?.id!, students: [] });
        if (res) {
            handleOff()
            refetch()
            navigate(`/groups/${res.id}/`)
        }
    }, [name, day, hour, room, teacher])

    const buttons = <>
        <Button type={ButtonType.TEXT_ACTION} text='Anuluj' onClick={handleOff} />
        <Button type={ButtonType.ACTION} text='Dodaj' onClick={handleAdd} />
    </>

    const warningButton = <>
        <Button type={ButtonType.OUTLINE} text='Ok' onClick={handleOff} />
    </>

    if (teacherEditionStatus === 'loading' || teacherEditionData === undefined) {
        return null
    }

    if (show) {
        if (teacherEditionData.length === 0) {
            return (
                <ModalContainer title='Nie można utworzyć grupy' off={handleOff} buttons={warningButton}>
                    Edycja nie posiada dydaktyków. Dodaj dydaktyka aby utworzyć grupę.
                </ModalContainer>
            )
        }
        else {
            return (
                <ModalContainer title='Nowa grupa' off={handleOff} buttons={buttons}>
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
        }
    } else {
        return null;
    }
};

AddNewModal.displayName = 'AddNewModal';