import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { updateSemester } from '../api/updateSemester';
import { Semester, SemesterPost } from '../types';
import { Edition } from 'features/editions';
import { Switch } from 'components/Switch';
import { YearField } from 'components/DateField';

interface IEditModal {
    show: boolean,
    off: () => void,
    refetch: () => void,
    data: Semester,
}

export const EditModal = ({ show, off, refetch, data }: IEditModal) => {
    const [year, setYear] = React.useState('');
    const [winter, setWinter] = React.useState(false);
    const defaultMsg = { year: '' }
    const [errorMsg, setErrorMsg] = React.useState(defaultMsg);

    React.useEffect(() => {
        setYear(data?.start_year);
        setWinter(data?.winter);
        setErrorMsg(defaultMsg);
    }, [data])

    const validate = React.useCallback(() => {
        let correct = true;

        if (!year) {
            setErrorMsg({ ...errorMsg, 'year': 'Pole wymagane' })
            correct = false;
        }

        return correct;
    }, [year, errorMsg])

    const handleUpdate = React.useCallback(async () => {
        if (!validate()) { return; }
        const new_data: SemesterPost = {
            id: data.id,
            winter: data.winter,
            start_year: data.start_year,
            active: data.active,
            editions: data.editions.map((edition: Edition) => edition.id)
        }
        const res = await updateSemester(new_data)
        if (res.data) {
            off();
            refetch();
        }
    }, [data, year, winter])

    const buttons = <>
        <Button type={ButtonType.TEXT_ACTION} text='Anuluj' onClick={off} />
        <Button type={ButtonType.ACTION} text='Zapisz' onClick={handleUpdate} />
    </>

    if (show) {
        return (
            <ModalContainer title={data.start_year} off={off} buttons={buttons}>
                <div className={`flex flex-col gap-1`}>
                    <YearField title={'Rok'} value={year} setValue={setYear} autoFocus={true} minYear={'2000'} errorMsg={errorMsg['year']} setErrorMsg={(e: string) => setErrorMsg({ ...errorMsg, 'year': e })}/>
                    <Switch leftText='Lato' rightText='Zima' value={winter} setValue={setWinter} />
                </div>
            </ModalContainer>
        );
    } else {
        return null;
    }
};

EditModal.displayName = 'EditModal';