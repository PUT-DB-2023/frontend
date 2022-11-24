import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { CheckBox } from 'components/CheckBox';
import { DateField } from 'components/DateField';
import { updateEdition } from '../api/updateEdition'
import { SemesterDropDown } from 'components/SemesterDropdown';
import { useQuery } from 'react-query'
import { getSemesters } from 'features/semesters/api/getSemesters';
import { Semester } from 'types/index'

interface IEditModal {
    show: boolean,
    off: () => void,
    refetch: () => void,
    data: any,
}

export const EditModal = ({ show, off, refetch, data }: IEditModal) => {
    const [description, setDescription] = React.useState('');
    const [dateOpened, setDateOpened] = React.useState<Date>(new Date());
    const [dateClosed, setDateClosed] = React.useState<Date>(new Date());
    const [semester, setSemester] = React.useState<Semester>({id: 1, year: '', winter: false});
    // const [active, setActive] = React.useState(false);
    const [course, setCourse] = React.useState('');

    const { data: semestersData, status: semestersStatus, refetch: semestersRefetch } = useQuery(['semesters'], () => getSemesters());

    React.useEffect(() => {
        const openArray = data?.date_opened?.split('-');
        const closeArray = data?.date_closed?.split('-');
        const selectedSemester: Semester = semestersData?.find((e: Semester) => e.id === data?.semester?.id);
        setDescription(data?.description);
        openArray && setDateOpened(new Date(openArray?.[0], openArray?.[1], openArray?.[2]));
        closeArray && setDateClosed(new Date(closeArray?.[0], closeArray?.[1], closeArray?.[2]));
        setSemester(selectedSemester);
        // setActive(data?.active);
        setCourse(data?.course?.id);
    }, [show, data])

    const handleUpdate = React.useCallback(async () => {
        const res = await updateEdition({ description, date_opened: dateOpened, date_closed: dateClosed, semester: semester?.id.toString(), course, id: data.id });
        console.log(res)
        if (res) {
            off();
            refetch()
        }
    }, [description, dateOpened, dateClosed, semester, course, data?.id])

    if (show) {
        return (
            <ModalContainer title='Edytuj edycję' off={off}>
                <div className={`flex flex-col gap-1`}>
                    <Field title={"Opis"} value={description} setValue={setDescription} />
                    <DateField title={"Data startu"} value={dateOpened} setValue={setDateOpened} maxDate={dateClosed} />
                    <DateField title={"Data końca"} value={dateClosed} setValue={setDateClosed} minDate={dateOpened} />
                    <SemesterDropDown title={"Semestr"} values={semestersData} value={semester} setValue={setSemester} />
                    {/* <CheckBox title={'Aktywny:'} value={active} setValue={setActive} /> */}
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