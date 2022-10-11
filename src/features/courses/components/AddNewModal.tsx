import * as React from 'react';
import { ModalContainer } from 'components/ModalContainer';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { Course } from '../types';
import { addCourse } from '../api/addCourse';

export const AddNewModal = ({ show, off, refetch }: { show: boolean, off: () => void, refetch: () => void }) => {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const handleOff = React.useCallback(() => {
        setName('');
        setDescription('');
        off();
    }, [])
    
    const handleAdd = React.useCallback(async () => {
        const course: Course = {name: '', description: '', id: 2, createdAt: 0}
        course.name = name;
        course.description = description;
        course.createdAt = Date.now();
        handleOff();
        await addCourse(course);
        refetch()
    }, [name, description])

    if (show) {
        return (
            <ModalContainer title='Nowy przedmiot' off={handleOff}>
                <div className={`flex flex-col gap-1`}>
                    <Field title={"Name"} value={name} setValue={setName} />
                    <Field title={"Description"} value={description} setValue={setDescription} />
                </div>
                <div className={`flex gap-2 mt-10`}>
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