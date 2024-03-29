import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { DateField } from 'components/DateField';
import { updateEdition } from '../api/updateEdition'
import { SemesterDropDown } from 'components/SemesterDropdown';
import { useQuery } from 'react-query'
import { getSemesters } from 'features/semesters/api/getSemesters';
import { Semester } from 'features/semesters';
import { TeachersDropDown } from 'components/TeachersDropDown';
import { getTeachers } from 'features/groups/api/getTeachers';
import { getServers } from 'features/servers/api/getServers';
import { ServersDropDown } from 'components/ServersDropDown';
import { queryClient } from 'lib/react-query';
import { Server } from 'features/servers';
import { Teacher } from 'features/users';
import { objectMap } from 'api/objectMap';

interface IEditModal {
    show: boolean,
    off: () => void,
    refetch: () => void,
    data: any,
    courseId: string,
}

export const EditModal = ({ show, off, refetch, data, courseId }: IEditModal) => {
    const [description, setDescription] = React.useState('');
    const [dateOpened, setDateOpened] = React.useState<Date>(new Date());
    const [dateClosed, setDateClosed] = React.useState<Date>(new Date());
    const [semester, setSemester] = React.useState<Semester>();
    const [course, setCourse] = React.useState('');
    const [teachers, setTeachers] = React.useState<Teacher[]>([]);
    const [servers, setServers] = React.useState<Server[]>([]);
    const defaultMsg = { dateOpened: '', dateClosed: '' }
    const [errorMsg, setErrorMsg] = React.useState(defaultMsg);

    const { data: semestersData, status: semestersStatus, refetch: semestersRefetch } = useQuery(['semesters'], () => getSemesters());
    const { data: teachersData, status: teachersStatus, refetch: teachersRefetch } = useQuery(['teachers'], getTeachers);
    const { data: serversData, status: serversStatus, refetch: serversRefetch } = useQuery(['servers'], () => getServers({ courseId: courseId }));


    React.useEffect(() => {
        const openArray = data?.date_opened?.split('-');
        const closeArray = data?.date_closed?.split('-');
        const selectedSemester: Semester = semestersData?.find((e: Semester) => e.id === data?.semester?.id);
        const selectedTeachers = teachersData?.filter((t: any) => data?.teachers?.map((e: any) => e?.id).includes(t.id))
        const selectedServers = serversData?.filter((t: any) => data?.servers?.map((e: any) => e?.id).includes(t.id))
        setDescription(data?.description);
        openArray && setDateOpened(new Date(openArray?.[0], openArray?.[1], openArray?.[2]));
        closeArray && setDateClosed(new Date(closeArray?.[0], closeArray?.[1], closeArray?.[2]));
        setSemester(selectedSemester);
        setCourse(data?.course?.id);
        setTeachers(selectedTeachers);
        setServers(selectedServers);
        setErrorMsg(defaultMsg);
    }, [show, data])

    const validate = React.useCallback(() => {
        let correct = true;

        if (!dateOpened) {
            setErrorMsg(prevState => ({ ...prevState, 'dateOpened': 'Pole wymagane' }));
            correct = false;
        }

        if (!dateClosed) {
            setErrorMsg(prevState => ({ ...prevState, 'dateClosed': 'Pole wymagane' }));
            correct = false;
        }

        if (dateOpened > dateClosed) {
            setErrorMsg(prevState => ({ ...prevState, 'dateOpened': 'Data musi być mniejsza od daty zakończenia' }));
            setErrorMsg(prevState => ({ ...prevState, 'dateClosed': 'Data musi być większa od daty rozpoczęcia' }));
            correct = false;
        }


        let sum = 0;
        objectMap(errorMsg, (v: any) => sum += v.length)

        return correct && sum === 0;
    }, [dateOpened, dateClosed, errorMsg])

    const handleUpdate = React.useCallback(async () => {
        if (!validate()) { return; };
        const res = await updateEdition({ description, date_opened: dateOpened, date_closed: dateClosed, semester: semester!.id.toString(), course, id: data.id, teachers: teachers, servers: servers });
        if (res) {
            off();
            refetch()
            queryClient.refetchQueries(['teacherEdition'])
            queryClient.refetchQueries(['selectedEdition'])
        }
    }, [description, dateOpened, dateClosed, semester, course, data?.id, teachers, servers])

    const buttons = <>
        <Button type={ButtonType.TEXT_ACTION} text='Anuluj' onClick={off} />
        <Button type={ButtonType.ACTION} text='Zapisz' onClick={handleUpdate} />
    </>

    if (show) {
        return (
            <ModalContainer title='Edytuj edycję' off={off} buttons={buttons}>
                <div className={`flex flex-col gap-1`}>
                    <Field title={"Opis"} multiline={true} value={description} setValue={setDescription} autoFocus={true} maxLenght={255} />
                    <div className='flex justify-between'>
                        <DateField title={"Data startu"} value={dateOpened} setValue={setDateOpened} errorMsg={errorMsg['dateOpened']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'dateOpened': e }))} />
                        <DateField title={"Data końca"} value={dateClosed} setValue={setDateClosed} errorMsg={errorMsg['dateClosed']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'dateClosed': e }))} />
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

EditModal.displayName = 'EditModal';