import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { clsName, clsTextWrong, clsNameWrong } from 'components/FieldBox';
import { addStudentsFile } from '../api/addStudentsFile';

export const blueButtonStyle = "p-2 file:p-2 file:rounded-lg file:bg-blue-700 file:text-white file:hover:bg-blue-800 file:border-0"

export const AddStudCSVModal = ({ show, off, refetch, id, showInfo, setResult }: { show: boolean, off: () => void, refetch: () => void, id: string, showInfo: () => void, setResult: React.Dispatch<React.SetStateAction<any>> }) => {
    const [students, setStudents] = React.useState(undefined);
    const [errorMsg, setErrorMsg] = React.useState('');

    const handleOff = React.useCallback(() => {
        setStudents(undefined);
        setErrorMsg('')
        off();
    }, [])

    const handleAdd = React.useCallback(async () => {
        if (students !== undefined) {
            const data = new FormData();
            data.append('group_id', id);
            data.append('students_csv', students)
            const res = await addStudentsFile(data);
            handleOff()
            if (res) {
                refetch()
                if (res) {
                    setResult(res.students_info)
                    showInfo()
                }
            }
        } else {
            setErrorMsg('Musisz wybrać plik')
        }
    }, [students, id])

    const handleSelectedFile = React.useCallback((event: any) => {
        setErrorMsg('')
        setStudents(event.target.files[0]);
    }, []);

    const buttons = <>
        <Button type={ButtonType.TEXT_ACTION} text='Anuluj' onClick={handleOff} />
        <Button type={ButtonType.ACTION} text='Dodaj' onClick={handleAdd} />
    </>

    if (show) {
        return (
            <ModalContainer title='Wczytaj studentów z pliku CSV' off={handleOff} buttons={buttons}>
                <div className={`flex flex-col gap-1`}>
                    <input className={`${errorMsg.length > 0 ? clsNameWrong : clsName} ${blueButtonStyle}`} type="file" accept=".csv, .xlsx" onChange={handleSelectedFile} />
                    {errorMsg.length > 0 && <span className={clsTextWrong}>{errorMsg}</span>}
                </div>
            </ModalContainer>
        );
    } else {
        return null;
    }
};

AddStudCSVModal.displayName = 'AddStudCSVModal';