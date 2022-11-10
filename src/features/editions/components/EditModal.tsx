import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { addEdition } from '../api/addEdition';
import { CheckBox } from 'components/CheckBox';
import { DateField } from 'components/DateField';
import { updateEdition } from '../api/updateEdition'

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
    const [semester, setSemester] = React.useState('');
    const [course, setCourse] = React.useState('');
    const ref = React.useRef(null);

    React.useEffect(()=>{
        const openArray = data?.date_opened?.split('-');
        const closeArray = data?.date_closed?.split('-');
        setDescription(data.description);
        openArray && setDateOpened(new Date(openArray?.[0], openArray?.[1], openArray?.[2]));
        closeArray && setDateClosed(new Date(closeArray?.[0], closeArray?.[1], closeArray?.[2]));
        setSemester(data.semester.id);
        setCourse(data.course.id);
    },[show, data])

    const handleUpdate = React.useCallback(async () => {
        const res = await updateEdition({description, date_opened: dateOpened, date_closed: dateClosed, semester, course, id: data.id});
        if (res) {
            off();
            refetch()
         }
    }, [description, dateOpened, dateClosed, semester, course])

    if (show) {
        return (
            <ModalContainer title='Edytuj edycję' off={off}>
                <div className={`flex flex-col gap-1`}>
                    <Field title={"Opis"} value={description} setValue={setDescription} />
                    <DateField title={"Data startu"} value={dateOpened} setValue={setDateOpened} maxDate={dateClosed} />
                    <DateField title={"Data końca"} value={dateClosed} setValue={setDateClosed} minDate={dateOpened}/>
                    <Field title={"Semestr"} value={semester} setValue={setSemester} />
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