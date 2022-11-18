import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { addEdition } from '../api/addEdition';
import { CheckBox } from 'components/CheckBox';
import { DateField } from 'components/DateField';
import { useNavigate } from 'react-router-dom';

export const AddNewModal = ({ show, off, refetch, courseId }: { show: boolean, off: () => void, refetch: () => void, courseId: string }) => {
    const [description, setDescription] = React.useState('');
    const [dateOpened, setDateOpened] = React.useState<Date>(new Date());
    const [dateClosed, setDateClosed] = React.useState<Date>(new Date());
    const [semester, setSemester] = React.useState('1');
    const [course, setCourse] = React.useState(courseId);

    const navigate = useNavigate()

    const handleOff = React.useCallback(() => {
        setDescription('');
        setDateOpened(new Date());
        setDateClosed(new Date());
        setSemester('1');
        setCourse(courseId);
        off();
    }, [])

    const handleAdd = React.useCallback(async () => {
        const res = await addEdition({description, date_opened: dateOpened, date_closed: dateClosed, semester, course});
        if (res) {
            handleOff();
            refetch()
            // navigate(`courses/${res.data.id}/`)
         } else {
         }
    }, [description, dateOpened, dateClosed, semester, course])

    if (show) {
        return (
            <ModalContainer title='Nowa edycja' off={handleOff}>
                <div className={`flex flex-col gap-1`}>
                    <Field title={"Opis"} value={description} setValue={setDescription} />
                    <DateField title={"Data startu"} value={dateOpened} setValue={setDateOpened} maxDate={dateClosed} />
                    <DateField title={"Data końca"} value={dateClosed} setValue={setDateClosed} minDate={dateOpened}/>
                    <Field title={"Semestr"} value={semester} setValue={setSemester} />
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