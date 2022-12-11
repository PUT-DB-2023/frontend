import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { useQuery } from 'react-query'
import { StudentsDropDown } from 'components/StudentsDropDown';
import { getStudents } from 'features/users/api/getStudents';
import { addStudents } from '../api/addStudents';
import { clsTextWrong } from 'components/FieldBox';

export const AddStudents = ({ show, off, refetch, group }: { show: boolean, off: () => void, refetch: () => void, group: any }) => {
    const { data: studentsData, status: studentsStatus, refetch: studentsRefetch } = useQuery(['students'], getStudents);
    const [students, setStudents] = React.useState([]);
    const [errorMsg, setErrorMsg] = React.useState('');

    const handleOff = React.useCallback(() => {
        setStudents([]);
        setErrorMsg('');
        off();
    }, [])

    const filtered = studentsData?.filter((s: any) => !group?.students?.map((e: any) => e.id).includes(s.id))

    const handleAdd = React.useCallback(async () => {
        if (students.length === 0) {
            setErrorMsg('Wybierz chocia jednego studenta')
            return;
        }
        const allStudents = [...group?.students, ...students].map(s => s.id)
        const res = await addStudents({ id: group?.id, students: allStudents });
        if (res.data) {
            handleOff();
            refetch()
        }
    }, [group, students, studentsData])

    const buttons = <>
        <Button type={ButtonType.OUTLINE} text='Anuluj' onClick={handleOff} />
        <Button type={ButtonType.ACTION} text='Dodaj' onClick={handleAdd} />
    </>

    if (show) {
        return (
            <ModalContainer title='Dodaj studenta do grupy' off={handleOff} buttons={buttons}>
                <div className={`flex flex-col gap-1`}>
                    <StudentsDropDown title={"Studenci"} values={filtered} value={students} setValue={setStudents} style={{maxHeight: '30vh'}} errorMsg={errorMsg} setErrorMsg={setErrorMsg}/>
                    {errorMsg.length > 0 && <span className={clsTextWrong}>{errorMsg}</span>}
                </div>
            </ModalContainer>
        );
    } else {
        return null;
    }
};

AddStudents.displayName = 'AddStudents';