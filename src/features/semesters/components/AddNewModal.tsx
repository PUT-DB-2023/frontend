import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { addSemester } from '../api/addSemester';

export const AddNewModal = ({ show, off, refetch }: { show: boolean, off: () => void, refetch: () => void }) => {
    const [year, setYear] = React.useState('');
    const [winter, setWinter] = React.useState(false);

    const handleOff = React.useCallback(() => {
        setYear('');
        setWinter(false)
        off();
    }, [])

    const handleAdd = React.useCallback(async () => {
        const res = await addSemester({start_year: year, winter, active: false, editions: []})
        if (res.data) {
            handleOff();
            refetch();
        }
    }, [year, winter])

    if (show) {
        return (
            <ModalContainer title='Nowy semestr' off={handleOff}>
                <div className={`flex flex-col gap-1`}>
                    <Field title={"Rok"} value={year} setValue={setYear} />
                    <div className='flex gap-2 items-center'>
                        Zima:
                        <input type="checkbox" checked={winter} onChange={() => setWinter(!winter)} className="w-4 h-4 text-blue-600 accent-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"></input>
                    </div>
                </div>
                <div className={`flex flex-wrap gap-2 mt-10`}>
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