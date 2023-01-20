import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { addSemester } from '../api/addSemester';
import { YearField } from 'components/DateField';
import { Switch } from 'components/Switch';
import { toast } from 'react-toastify'
import { Field } from 'components/Field';

export const AddNewModal = ({ show, off, refetch }: { show: boolean, off: () => void, refetch: () => void }) => {
    const [year, setYear] = React.useState(new Date());
    const [winter, setWinter] = React.useState(false);
    const defaultMsg = { year: '' }
    const [errorMsg, setErrorMsg] = React.useState(defaultMsg);

    const handleOff = React.useCallback(() => {
        setYear(new Date());
        setWinter(false);
        setErrorMsg(defaultMsg);
        off();
    }, [])

    const validate = React.useCallback(() => {
        let correct = true;

        if (!year) {
            setErrorMsg({ ...errorMsg, 'year': 'Pole wymagane' })
            correct = false;
        }

        return correct;
    }, [year, errorMsg])

    const handleAdd = React.useCallback(async () => {
        if (!validate()) { return; }
        if (!year) {
            toast('Uzupełnij wszystkie wymagane pola', { type: "error", theme: "colored", isLoading: false, closeButton: true, autoClose: 12000 })
            return
        }
        const res = await addSemester({ start_year: year?.getFullYear()?.toString(), winter, active: false, editions: [] })
        if (res) {
            handleOff();
            refetch();
        }
    }, [year, winter])

    const buttons = <>
        <Button type={ButtonType.TEXT_ACTION} text='Anuluj' onClick={handleOff} />
        <Button type={ButtonType.ACTION} text='Dodaj' onClick={handleAdd} />

    </>

    if (show) {
        return (
            <ModalContainer title='Nowy semestr' off={handleOff} buttons={buttons} style={{ height: 'min(100%, 470px)' }}>
                <div className={`flex flex-col`}>
                    <div className="flex">
                        <YearField title={'Rok rozpoczęcia'} value={year} setValue={setYear} autoFocus={true} minYear={'2000'} errorMsg={errorMsg['year']} setErrorMsg={(e: string) => setErrorMsg({ ...errorMsg, 'year': e })} />
                        <Field title={"Rok zakończenia"} value={year.getFullYear() + 1} disabled={true} />
                    </div>
                    <Switch leftText='Lato' rightText='Zima' value={winter} setValue={setWinter} />
                </div>
            </ModalContainer>
        );
    } else {
        return null;
    }
};

AddNewModal.displayName = 'AddNewModal';