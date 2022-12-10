import { ModalContainer } from 'components/ModalContainer';
import { Button } from 'components/Button';
import { ButtonType } from 'types';
import { FieldBox } from 'components/FieldBox';
import { addStudentsFile } from '../api/addStudentsFile';
import { ColumnDef } from '@tanstack/react-table';
import { ReactNode, useCallback, useState } from 'react';
import { Table } from 'components/Table';
import { CheckCircleIcon, MinusCircleIcon, XCircleIcon } from '@heroicons/react/solid';

export type StudentInfo = {
  student_id: string;
  first_name: string;
  last_name: string;
  student_created: boolean;
  added_to_group: boolean;
  account_created: any;
}

export const AddStudentInfoModal = ({ show, off, refetch, id, data }: { show: boolean, off: () => void, refetch: () => void, id: string, data: StudentInfo[] | undefined }) => {

  let columns : ColumnDef<any>[] =
  [
    {
      accessorKey: 'student_id',
      header: 'Indeks',
      cell: ({getValue}) => (
        <div className='p-2'>
            {getValue() as ReactNode}
        </div>
      )
    },
    {
      accessorKey: 'first_name',
      header: 'Imię',
      cell: ({getValue}) => (
        <div className='p-2'>
            {getValue() as ReactNode}
        </div>
      )
    },
    {
      accessorKey: 'last_name',
      header: 'Nazwisko',
      cell: ({getValue}) => (
        <div className='p-2'>
            {getValue() as ReactNode}
        </div>
      )
    },
    {
      accessorKey: 'student_created',
      header: 'Utworzono studenta',
      cell: ({getValue} : {getValue : any}) => (
        <div className='p-2'>
            {getValue() === true ? <CheckCircleIcon className='h-6 text-green-500'/> : getValue() === false ? <MinusCircleIcon className='h-6 text-zinc-400'/> : <XCircleIcon className='h-6 text-red-500'/>}
        </div>
      )
    },
    {
      accessorKey: 'added_to_group',
      header: 'Dodano do grupy',
      cell: ({getValue} : {getValue : any}) => (
        <div className='p-2'>
            {getValue() === true ? <CheckCircleIcon className='h-6 text-green-500'/> : getValue() === false ? <MinusCircleIcon className='h-6 text-zinc-400'/> : <XCircleIcon className='h-6 text-red-500'/>}
        </div>
      )
    },
  ]

    const handleOff = useCallback(() => {
        off();
    }, [])

    console.log('INFO MODAL')

    if (data && data.length) {
      const server_columns : ColumnDef<any>[] = Object.keys(data[0].account_created).map((server: string) => {
        return (
          {
            accessorKey: `account_created.${server}`,
            header: `${server}`,
            cell: ({getValue} : {getValue : any}) => (
              <div className='p-2'>
                {getValue() === true ? <CheckCircleIcon className='h-6 text-green-500'/> : getValue() === false ? <MinusCircleIcon className='h-6 text-zinc-400'/> : <XCircleIcon className='h-6 text-red-500'/>}
              </div>
            )
          }
        )
      })

      console.log('CONCAT')
      columns = columns.concat(server_columns)
    }

    if (show) {
        return (
            <ModalContainer title='Informacje o utworzonych kontach' off={handleOff}>
                <div className={`flex flex-col pt-8`}>
                    <Table data={data} columns={columns}/>
                    <div className='flex flex-col gap-2 text-sm pt-4'>
                      <div className='flex items-center gap-2'>
                        <CheckCircleIcon className='h-6 text-green-500'/>
                        Operacja przebiegła pomyślnie
                      </div>
                      <div className='flex items-center gap-2'>
                        <MinusCircleIcon className='h-6 text-zinc-400'/>
                        Operacja nie została wykonana - dane już istnieją
                      </div>
                      <div className='flex items-center gap-2'>
                        <XCircleIcon className='h-6 text-red-500'/>
                        Operacja zakończyła się błędem
                      </div>
                    </div>
                </div>
                <div className={`flex gap-2 mt-10 self-end justify-end`}>
                    <Button type={ButtonType.ACTION} text='Ok' onClick={handleOff} />
                </div>
            </ModalContainer>
        );
    } else {
        return null;
    }
};

AddStudentInfoModal.displayName = 'AddStudCSVModal';