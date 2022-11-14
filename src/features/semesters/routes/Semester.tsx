import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import { Spinner } from 'components/Spinner'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { ButtonType, PanelType } from 'types'
import { getSemester } from '../api/getSemester'
// import { SemesterInfo } from '../components/SemesterInfo'
import { RemoveModal } from '../components/RemoveModal'
import { EditModal } from '../components/EditModal'
import * as React from 'react'
import { Menu } from '@headlessui/react'
import { DotsHorizontalIcon } from '@heroicons/react/solid'
import { activeSemester } from '../api/activeSemester'

export const Semester = () => {
  const [showRemove, setShowRemove] = React.useState(false)
  const [showEdit, setShowEdit] = React.useState(false)
  const { id } = useParams()

  const semesterQuery = useQuery(['semester', id], () => getSemester( id ))
  // const {data: semesterQuery } = useQuery(['semester', id], () => getSemester( id ))
  const refetch = semesterQuery.refetch;

  const activation = React.useCallback(()=>{
    id && activeSemester({id: id, active: !semesterQuery.data.active, refresh: refetch});
    semesterQuery.refetch()
  },[semesterQuery, id, refetch])

  if (semesterQuery.isLoading) {
    return (
      <Spinner />
    );
  }
  else if (semesterQuery.isError) {
    return (
      <div>
        Error!
      </div>
    );
  }

  console.log(semesterQuery.data)

  return (
    <ContentLayout>
      <RemoveModal off={()=>setShowRemove(false)} show={showRemove} id={id} name={semesterQuery.data.name}/>
      <EditModal off={()=>setShowEdit(false)} show={showEdit} refetch={semesterQuery.refetch} data={{id: id as string, ...semesterQuery.data}}/>
        <ContentPanel type={PanelType.HEADER}>
          <div className='flex-col'>
            <h1 className='text-black text-3xl font-bold mb-4'> Serwer - { semesterQuery.data.name }</h1>
          </div>
          <div className='flex items-start'>
            <div className='flex gap-6'>
              {semesterQuery.data.active ? 
                <Button type={ButtonType.WARNING} text='Deaktywuj' onClick={activation}/> :
                <Button type={ButtonType.ACTION} text='Aktywuj' onClick={activation}/>
              } 
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="flex text-black items-center space-x-4">
                    <DotsHorizontalIcon className='w-7 h-auto cursor-pointer hover:text-zinc-500'/>
                  </Menu.Button>
                </div>
                  <Menu.Items className="absolute right-0 mt-4 w-[212px] origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active } : { active : boolean }) => (
                            <button
                              onClick={()=>setShowEdit(true)}
                              className={`${
                                active ? 'bg-blue-100' : 'text-black'
                              } group flex w-full items-center rounded-lg px-2 py-2 text-sm`}
                            >
                              Edytuj
                            </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active } : { active : boolean }) => (
                          <button
                            onClick={()=>setShowRemove(true)}
                            className={`${
                              active ? 'bg-red-500 text-white' : 'text-red-500'
                            } group flex w-full items-center rounded-lg px-2 py-2 text-sm`}
                          >
                            Usuń
                          </button>
                        )}
                      </Menu.Item>
                      
                    </div>
                  </Menu.Items>
              </Menu>
            </div>
          </div>
        </ContentPanel>
        <ContentPanel type={PanelType.CONTENT}>
          <h2 className='text-lg font-semibold'> Szczegóły </h2>
          {/* <SemesterInfo semesterData={semesterQuery.data} /> */}
        </ContentPanel>
        <ContentPanel type={PanelType.CONTENT}>
          <h2 className='text-lg font-semibold'> Polecenia bazodanowe </h2>
          <div className='flex flex-col'>
            <span className='font-normal text-base'> Tworzenie użytkownika </span>
            <span className='font-normal text-base'> Modyfikowanie użytkownika </span>
            <span className='font-normal text-base'> Usuwanie użytkownika </span>
          </div>
        </ContentPanel>
    </ContentLayout>
  )
}
