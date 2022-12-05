import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { FieldBox } from 'components/FieldBox';
import { addStudentsFile } from '../api/addStudentsFile';

export const AddStudCSVModal = ({ show, off, refetch, id, showInfo, setResult }: { show: boolean, off: () => void, refetch: () => void, id: string, showInfo: () => void, setResult : React.Dispatch<React.SetStateAction<any>>}) => {
    const [students, setStudents] = React.useState(undefined);

    const handleOff = React.useCallback(() => {
        setStudents(undefined);
        off();
    }, [])

    const handleAdd = React.useCallback(async () => {
        if (students !== undefined) {
            const data = new FormData();
            data.append('group_id', id);
            data.append('students_csv', students)
            const res = await addStudentsFile(data);
            if (res) {
                console.log(res.data);
                handleOff()
                refetch()
                if (res.data){
                    showInfo()
                    setResult(res.data.existing_students)
                }
            }
        }
    }, [students, id])

    const handleSelectedFile = React.useCallback((event: any) => {
        setStudents(event.target.files[0]);
    }, []);

    if (show) {
        return (
            <ModalContainer title='Dodaj studentów z pliku CSV' off={handleOff}>
                <div className={`flex flex-col gap-1`}>
                    <FieldBox>
                        <input className="block w-full text-zinc-600 border border-zinc-400 rounded-lg cursor-pointer focus:outline-none focus-visible:outline-blue-800"
                            type="file" accept=".csv, .xlsx" onChange={handleSelectedFile} />
                    </FieldBox>
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

AddStudCSVModal.displayName = 'AddStudCSVModal';