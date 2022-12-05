import { ModalContainer } from 'components/ModalContainer';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { FieldBox } from 'components/FieldBox';
import { addStudentsFile } from '../api/addStudentsFile';
import { ColumnDef } from '@tanstack/react-table';
import { ReactNode, useCallback, useState } from 'react';
import { Table } from 'components/Table';

const columns : ColumnDef<any>[] =
[
    {
        accessorKey: 'student_id',
        header: () => 'Indeks',
        cell: ({getValue}) => (
          <div className='p-2'>
              {getValue() as ReactNode}
          </div>
        )
      },
    {
      accessorKey: 'first_name',
      header: () => 'Imię',
      cell: ({getValue}) => (
        <div className='p-2'>
            {getValue() as ReactNode}
        </div>
      )
    },
    {
      accessorKey: 'last_name',
      header: () => 'Nazwisko',
      cell: ({getValue}) => (
        <div className='p-2'>
            {getValue() as ReactNode}
        </div>
      )
    },
    {
      accessorKey: 'student_created',
      header: () => 'Utworzono studenta',
      cell: ({getValue}) => (
        <div className='p-2'>
            {getValue() as ReactNode}
        </div>
      )
    },
    {
      accessorKey: 'added_to_group',
      header: () => 'Dodano do grupy',
      cell: ({getValue} : {getValue : any}) => (
        <div className='p-2'>
            {getValue() ? <span>Zima</span> : <span>Lato</span>}
        </div>
      )
    },
    {
        accessorKey: 'created_db_accounts',
        header: () => 'Utworzono konta bazodanowe',
        cell: ({getValue}) => (
          <div className='p-2'>
              {getValue() as ReactNode}
          </div>
        )
    }
  ]

export const AddStudInfoModal = ({ show, off, refetch, id, data }: { show: boolean, off: () => void, refetch: () => void, id: string, data: any }) => {
    const [students, setStudents] = useState(undefined);

    const handleOff = useCallback(() => {
        off();
    }, [])

    const handleAdd = useCallback(async () => {
        if (students !== undefined) {
            const data = new FormData();
            data.append('group_id', id);
            data.append('students_csv', students)
            const res = await addStudentsFile(data);
            if (res) {
                handleOff()
                refetch()
            }
        }
    }, [students, id])

    const handleSelectedFile = useCallback((event: any) => {
        setStudents(event.target.files[0]);
    }, []);

    if (show) {
        return (
            <ModalContainer title='Informacje o utworzonych kontach' off={handleOff}>
                <div className={`flex flex-col gap-1`}>
                    <Table data={data} columns={columns}/>
                </div>
                <div className={`flex gap-2 mt-10 self-end`}>
                    <Button type={ButtonType.ACTION} text='Ok' onClick={handleOff} />
                </div>
            </ModalContainer>
        );
    } else {
        return null;
    }
};

AddStudInfoModal.displayName = 'AddStudCSVModal';