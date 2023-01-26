import { objectMap } from 'api/objectMap';
import { Button } from 'components/Button';
import { Field } from 'components/Field';
import { MajorsDropDown } from 'components/MajorsDropDown';
import { ModalContainer } from 'components/ModalContainer';
import { Major } from 'features/majors';
import { getMajors } from 'features/majors/api/getMajors';
import * as React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ButtonType } from 'types';
import { addCourse } from '../api/addCourse';

export const AddNewModal = ({ show, off, refetch }: { show: boolean, off: () => void, refetch: any }) => {
    const { data: majorsData, status: majorsStatus, refetch: majorsRefetch } = useQuery(['dbms'], () => getMajors());
    const [name, setName] = React.useState('');
    const [major, setMajor] = React.useState<Major>();
    const [description, setDescription] = React.useState('');
    const defaultMsg = { name: '', major: '' }
    const [errorMsg, setErrorMsg] = React.useState(defaultMsg);

    const navigate = useNavigate();

    const validate = React.useCallback(() => {
        let correct = true;

        if (name.length === 0) {
            setErrorMsg({ ...errorMsg, 'name': 'Pole wymagane' });
            correct = false;
        }

        if (!major) {
            setErrorMsg(prevState => ({ ...prevState, 'major': 'Pole wymagane' }));
            correct = false;
        }

        let sum = 0;
        objectMap(errorMsg, (v: any) => sum += v.length)

        return correct && sum === 0;
    }, [name, major, errorMsg])

    const handleOff = React.useCallback(() => {
        setName('');
        setMajor(undefined);
        setDescription('');
        setErrorMsg(defaultMsg);
        off();
    }, [])

    const handleAdd = React.useCallback(async () => {
        if (!validate()) {
            return;
        }
        const res = await addCourse({ name, description, major: major?.id });
        if (res) {
            handleOff();
            refetch()
            navigate(`${res.id}/`)
        }
    }, [name, description, major])

    const buttons = <>
        <Button type={ButtonType.TEXT_ACTION} text='Anuluj' onClick={handleOff} />
        <Button type={ButtonType.ACTION} text='Dodaj' onClick={handleAdd} />
    </>

    if (show) {
        return (
            <ModalContainer title='Nowy przedmiot' off={handleOff} buttons={buttons}>
                <div className={`flex flex-col gap-1`}>
                    <Field title={"Nazwa"} value={name} setValue={setName} autoFocus={true} errorMsg={errorMsg['name']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'name': e }))} maxLenght={50}/>
                    {majorsData && <MajorsDropDown title='Kierunek' values={majorsData} value={major} setValue={setMajor} errorMsg={errorMsg['major']} setErrorMsg={(e: string) => setErrorMsg(prevState => ({ ...prevState, 'major': e }))}/>}
                    <Field title={"Opis"} value={description} setValue={setDescription} multiline={true} maxLenght={255}/>
                </div>
            </ModalContainer>
        );
    } else {
        return null;
    }
};

AddNewModal.displayName = 'AddNewModal';