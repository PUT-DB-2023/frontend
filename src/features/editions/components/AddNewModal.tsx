import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { addEdition } from '../api/addEdition';
import { CheckBox } from 'components/CheckBox';
import { DateField } from 'components/DateField';
import { useNavigate } from 'react-router-dom';
import { SemesterDropDown } from 'components/SemesterDropdown';
import { useQuery } from 'react-query'
import { getSemesters } from 'features/semesters/api/getSemesters';
import { Semester } from 'types/index'
import { TeachersDropDown } from 'components/TeachersDropDown';
import { getTeachers } from 'features/groups/api/getTeachers';

export const AddNewModal = ({ show, off, refetch, courseId }: { show: boolean, off: () => void, refetch: () => void, courseId: string }) => {
    const { data: semestersData, status: semestersStatus, refetch: semestersRefetch } = useQuery(['semesters'], () => getSemesters());
    const { data: teachersData, status: teachersStatus, refetch: teachersRefetch } = useQuery(['teachers'], getTeachers);
    const [description, setDescription] = React.useState('');
    const [dateOpened, setDateOpened] = React.useState<Date>(new Date());
    const [dateClosed, setDateClosed] = React.useState<Date>(new Date());
    const [semester, setSemester] = React.useState<Semester>(semestersData?.[0]);
    const [course, setCourse] = React.useState(courseId);
    const [teachers, setTeachers] = React.useState([]);

    const navigate = useNavigate()

    const handleOff = React.useCallback(() => {
        setDescription('');
        setDateOpened(new Date());
        setDateClosed(new Date());
        setSemester(semestersData[0]);
        setCourse(courseId);
        setTeachers([]);
        off();
    }, [])

    const handleAdd = React.useCallback(async () => {
        const res = await addEdition({description, date_opened: dateOpened, date_closed: dateClosed, semester: semester.id.toString(), course, teachers});
        if (res) {
            handleOff();
            refetch()
            navigate(`editions/${res.id}/`)
         } else {
         }
    }, [description, dateOpened, dateClosed, semester, course, teachers])

    if (show) {
        return (
            <ModalContainer title='Nowa edycja' off={handleOff}>
                <div className={`flex flex-col gap-1`}>
                    <Field title={"Opis"} value={description} setValue={setDescription} />
                    <DateField title={"Data startu"} value={dateOpened} setValue={setDateOpened} maxDate={dateClosed} />
                    <DateField title={"Data końca"} value={dateClosed} setValue={setDateClosed} minDate={dateOpened}/>
                    <SemesterDropDown title={"Semestr"} values={semestersData} value={semester} setValue={setSemester} />
                    <TeachersDropDown title={"Nauczyciele"} values={teachersData} value={teachers} setValue={setTeachers}/>
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