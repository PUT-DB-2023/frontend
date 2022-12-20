import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { addEdition, IAddEdition } from '../api/addEdition';
import { DateField } from 'components/DateField';
import { useNavigate } from 'react-router-dom';
import { SemesterDropDown } from 'components/SemesterDropdown';
import { useQuery } from 'react-query'
import { getSemesters } from 'features/semesters/api/getSemesters';
import { Semester } from 'features/semesters';
import { TeachersDropDown } from 'components/TeachersDropDown';
import { getTeachers } from 'features/groups/api/getTeachers';
import { ServersDropDown } from 'components/ServersDropDown';
import { getServers } from 'features/servers/api/getServers';

export const AddNewModal = ({ show, off, refetch, courseId }: { show: boolean, off: () => void, refetch: () => void, courseId: string }) => {
    const { data: semestersData, status: semestersStatus, refetch: semestersRefetch } = useQuery(['semesters'], () => getSemesters());
    const { data: teachersData, status: teachersStatus, refetch: teachersRefetch } = useQuery(['teachers'], getTeachers);
    const { data: serversData, status: serversStatus, refetch: serversRefetch } = useQuery(['servers'], () => getServers({ courseId: courseId }));

    const [description, setDescription] = React.useState('');
    const [dateOpened, setDateOpened] = React.useState<Date>(new Date());
    const [dateClosed, setDateClosed] = React.useState<Date>(new Date());
    const [semester, setSemester] = React.useState<Semester>(semestersData?.[0]);
    const [course, setCourse] = React.useState(courseId);
    const [teachers, setTeachers] = React.useState([]);
    const [servers, setServers] = React.useState([]);

    const navigate = useNavigate()

    React.useEffect(() => {
      setSemester(semestersData?.[semestersData.length - 1])
    }, [semestersData])
    

    const handleOff = React.useCallback(() => {
        setDescription('');
        setDateOpened(new Date());
        setDateClosed(new Date());
        setSemester(semestersData?.[0]);
        setCourse(courseId);
        setTeachers([]);
        setServers([]);
        off();
    }, [])

    const handleAdd = React.useCallback(async () => {
        const res = await addEdition({ description, date_opened: dateOpened, date_closed: dateClosed, semester: semester?.id.toString() || '', course, teachers, servers });
        if (res) {
            handleOff();
            refetch()
            navigate(`editions/${res.id}/`)
        }
    }, [description, dateOpened, dateClosed, semester, course, teachers, servers])

    if (semestersStatus === 'loading' || serversStatus === 'loading' || teachersStatus === 'loading' || semestersData === undefined) {
        return null
    }

    const buttons = <>
        <Button type={ButtonType.TEXT_ACTION} text='Anuluj' onClick={handleOff} />
        <Button type={ButtonType.ACTION} text='Dodaj' onClick={handleAdd} />
    </>

    if (show) {        
        return (
            <ModalContainer title='Nowa edycja' off={handleOff} buttons={buttons}>
                <div className={`flex flex-col gap-1`}>
                    <Field title={"Opis"} multiline={true} value={description} setValue={setDescription} autoFocus={true} maxLenght={255}/>
                    <div className='flex justify-between'>
                        <DateField title={"Data startu"} value={dateOpened} setValue={setDateOpened} maxDate={dateClosed} />
                        <DateField title={"Data końca"} value={dateClosed} setValue={setDateClosed} minDate={dateOpened} />
                    </div>
                    <SemesterDropDown title={"Semestr"} values={semestersData} value={semester} setValue={setSemester} />
                    <TeachersDropDown title={"Dydaktycy"} values={teachersData} value={teachers} setValue={setTeachers} />
                    <ServersDropDown title={"Serwery"} values={serversData} value={servers} setValue={setServers} />
                </div>
            </ModalContainer>
        );
    } else {
        return null;
    }
};

AddNewModal.displayName = 'AddNewModal';