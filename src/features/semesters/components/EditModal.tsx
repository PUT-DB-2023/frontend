import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { updateSemester } from '../api/updateSemester';
import { ISem } from '../api/updateSemester'
import { showToast } from 'api/showToast';

interface IEditModal {
    show: boolean,
    off: () => void,
    refetch: () => void,
    data: ISem,
}

export const EditModal = ({ show, off, refetch, data }: IEditModal) => {
    const [year, setYear] = React.useState('');
    const [winter, setWinter] = React.useState(false);

    React.useEffect(() => {
        setYear(data?.year);
        setWinter(data?.winter);
    }, [data])

    const handleUpdate = React.useCallback(async () => {
        const res = await updateSemester({id: data.id, year, winter, active: false, editions: []})
        if (res.data) {
            off();
            refetch();
         }
    }, [data, year, winter])

    if (show) {
        return (
            <ModalContainer title={data.year} off={off}>
                <div className={`flex flex-col gap-1`}>
                    <Field title={"Rok"} value={year} setValue={setYear} />
                    <div className='flex gap-2 items-center'>
                        Zima:
                        <input type="checkbox" checked={winter} onChange={() => setWinter(!winter)} className="w-4 h-4 text-blue-600 accent-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"></input>
                    </div>
                </div>
                <div className={`flex gap-2 mt-10`}>
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