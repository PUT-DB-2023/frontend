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

export const AddNewModal = ({ show, off, refetch }: { show: boolean, off: () => void, refetch: () => void }) => {
    const [name, setName] = React.useState('');
    const [day, setDay] = React.useState<WeekDay>(weekDays[0]);
    const [hour, setHour] = React.useState('08:00');
    const [room, setRoom] = React.useState('');
    const [teacher, setTeacher] = React.useState('');
    const [students, setStudents] = React.useState({title: '', selectedFile: '', name: ''});

    const { data: teachers, status: teachersStatus, refetch: teachersRefetch } = useQuery(['teachers'], getTeachers);

    const navigate = useNavigate()

    const handleOff = React.useCallback(() => {
        setName('');
        setDay(weekDays[0]);
        setHour('08:00');
        setRoom('');
        setTeacher('');
        setStudents({title: '', selectedFile: '', name: ''});
        off();
    }, [])

    const handleAdd = React.useCallback(async () => {
        const data = new FormData();
        data.append('file', students.selectedFile, students.name);
        console.log(data)
        const res = await addGroup({ name, day: day.field, hour, room, teacherEdition: '', students: [] });
        console.log(res)
        if (res) {
            handleOff()
            refetch()
            navigate(`${res.id}/`)
        }
    }, [name, day, hour, room, teacher, students])

    const handleSelectedFile = React.useCallback((event: any) => {
        setStudents({
            title: 'students',
            selectedFile: event.target.files[0],
            name: event.target.files[0].name
        });
    }, []);

    if (show) {
        return (
            <ModalContainer title='Nowa grupa' off={handleOff}>
                <div className={`flex flex-col gap-1`}>
                    <Field title={"Nazwa"} value={name} setValue={setName} />
                    <WeekDayDropDown title={'Dzień'} value={day} setValue={setDay} />
                    <TimeField title={"Godzina"} value={hour} setValue={setHour} />
                    <Field title={"Sala"} value={room} setValue={setRoom} />
                    <DropDown title={"Nauczyciel"} values={teachers} value={teacher} setValue={setTeacher} />
                    <FieldBox title={'Studenci'}>
                        <input className="block w-full text-zinc-600 border border-zinc-400 rounded-lg cursor-pointer focus:outline-none focus-visible:outline-blue-800"
                        type="file" accept=".csv, .xlsx" onChange={handleSelectedFile}/>
                    </FieldBox>
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