import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { updateSemester } from '../api/updateSemester';
import { showToast } from 'api/showToast';
import { Semester, SemesterPost } from '../types';
import { Edition } from 'features/editions';

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
        const new_data : SemesterPost = {
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

    if (show) {
        return (
            <ModalContainer title={data.start_year} off={off}>
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