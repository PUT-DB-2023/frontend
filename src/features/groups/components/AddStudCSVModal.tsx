import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { FieldBox, clsName, clsTextWrong, clsNameWrong } from 'components/FieldBox';
import { addStudentsFile } from '../api/addStudentsFile';

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
                if (res.data) {
                    setResult(res.data.students_info)
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
            <ModalContainer title='Dodaj studentów z pliku CSV' off={handleOff} buttons={buttons}>
                <div className={`flex flex-col gap-1`}>
                    <FieldBox>
                        <input className={errorMsg.length > 0 ? clsNameWrong : clsName} type="file" accept=".csv, .xlsx" onChange={handleSelectedFile} />
                        {errorMsg.length > 0 && <span className={clsTextWrong}>{errorMsg}</span>}
                    </FieldBox>
                </div>
            </ModalContainer>
        );
    } else {
        return null;
    }
};

AddStudCSVModal.displayName = 'AddStudCSVModal';