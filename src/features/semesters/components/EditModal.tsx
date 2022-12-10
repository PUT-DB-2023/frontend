import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { updateSemester } from '../api/updateSemester';
import { Semester, SemesterPost } from '../types';
import { Edition } from 'features/editions';
import { Switch } from 'components/Switch';

interface IEditModal {
    show: boolean,
    off: () => void,
    refetch: () => void,
    data: Semester,
}

export const EditModal = ({ show, off, refetch, data }: IEditModal) => {
    const [year, setYear] = React.useState('');
    const [winter, setWinter] = React.useState(false);

    React.useEffect(() => {
        setYear(data?.start_year);
        setWinter(data?.winter);
    }, [data])

    const handleUpdate = React.useCallback(async () => {
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
        <Button type={ButtonType.OUTLINE} text='Anuluj' onClick={off} />
        <Button type={ButtonType.ACTION} text='Zapisz zmiany' onClick={handleUpdate} />
    </>

    if (show) {
        return (
            <ModalContainer title={data.start_year} off={off} buttons={buttons}>
                <div className={`flex flex-col gap-1`}>
                    <Field title={"Rok"} value={year} setValue={setYear} />
                    <Switch leftText='Lato' rightText='Zima' value={winter} setValue={setWinter} />
                </div>
            </ModalContainer>
        );
    } else {
        return null;
    }
};

EditModal.displayName = 'EditModal';