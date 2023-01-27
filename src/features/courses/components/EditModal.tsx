import { objectMap } from 'api/objectMap';
import { Button } from 'components/Button';
import { Field } from 'components/Field';
import { MajorsDropDown } from 'components/MajorsDropDown';
import { ModalContainer } from 'components/ModalContainer';
import { Major } from 'features/majors';
import { getMajors } from 'features/majors/api/getMajors';
import * as React from 'react';
import { useQuery } from 'react-query';
import { ButtonType } from 'types';
import { updateCourse } from '../api/updateCourse';

interface IEditModal {
    show: boolean,
    off: () => void,
    refetch: () => void,
    data: { name: string, id: string, description: string, major?: Major }
}

export const EditModal = ({ show, off, refetch, data }: IEditModal) => {
    const { data: majorsData, status: majorsStatus, refetch: majorsRefetch } = useQuery(['dbms'], () => getMajors());
    const [name, setName] = React.useState(data.name);
    const [major, setMajor] = React.useState<Major | undefined>(data?.major);
    const [description, setDescription] = React.useState(data.description);
    const defaultMsg = { name: '', major: '' }
    const [errorMsg, setErrorMsg] = React.useState(defaultMsg);

    React.useEffect(() => {
        setName(data.name);

        const majorSet = majorsData?.find((e: Major) => e.id === data?.major?.id);
        setMajor(majorSet);

        setDescription(data.description);
        setErrorMsg(defaultMsg);
    }, [show, data])

    const validate = React.useCallback(() => {
        let correct = true;

        if (name.length === 0) {
            setErrorMsg({ ...errorMsg, 'name': 'Pole wymagane' })
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

    const handleUpdate = React.useCallback(async () => {
        if (!validate()) {
            return;
        }
        const res = await updateCourse({ id: data.id, name, description, major: major?.id })
        if (res) {
            off();
            refetch();
        }
    }, [name, major, description, data])

    const buttons = <>
        <Button type={ButtonType.TEXT_ACTION} text='Anuluj' onClick={off} />
        <Button type={ButtonType.ACTION} text='Zapisz' onClick={handleUpdate} />
    </>

    if (show) {
        return (
            <ModalContainer title={data.name} off={off} buttons={buttons}>
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

EditModal.displayName = 'EditModal';