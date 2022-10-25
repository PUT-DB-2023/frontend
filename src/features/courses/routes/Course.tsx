import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import { Spinner } from 'components/Spinner'
import { getEditions } from 'features/editions/api/getEditions'
import { EditionList } from 'features/editions/components/EditionList'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { ButtonType, Status, PanelType, testSortOptions } from 'types'
import { getCourse } from '../api/getCourse'
import { RemoveModal } from '../components/RemoveModal'
import { EditModal } from '../components/EditModal'
import * as React from 'react'
import { Toolbar } from 'components/Toolbar'
import { DotsHorizontalIcon } from '@heroicons/react/outline'
import { Menu } from '@headlessui/react'

// TODO Add the edition fetching to the edition list component

export const Course = () => {
  const [removeModal, setRemoveModal] = React.useState(false)
  const [editModal, setEditModal] = React.useState(false)

  const { id } = useParams()

  const { data : courseData, status : courseStatus, refetch : courseRefetch } = useQuery(['course', id], () => getCourse(id))
  const { data : editionData, status : editionStatus, refetch : editionRefetch } = useQuery(['editions', id], () => getEditions(id))
  
  if (editionStatus == 'loading' || courseStatus == 'loading') {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }
  
  return (
    <ContentLayout>
        <RemoveModal show={removeModal} off={() => setRemoveModal(false)} id={id} name={courseData.name} />
        <EditModal refetch={() => courseRefetch()} show={editModal} off={() => setEditModal(false)} data={courseData} />
        <ContentPanel type={PanelType.HEADER}> 
          <div className='flex-col'>
            <h1 className='text-black text-3xl font-bold mb-4'>{ courseData.name }</h1>
            <h2 className='text-blue-900 font-semibold mb-8'> { editionData !== undefined ? editionData.length : '' } edycje </h2>
            <h3 className='text-slate-500 text-base text-justify'>{ courseData.description }</h3>
          </div>
          <div className='flex items-start'>
            <div className='flex gap-6'>
              <Button type={ButtonType.ACTION} text='Dodaj edycję' onClick={()=>console.log('ADD EDITION')}/>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="flex text-black items-center space-x-4">
                    <DotsHorizontalIcon className='w-7 h-auto cursor-pointer hover:text-zinc-500'/>
                  </Menu.Button>
                </div>
                  <Menu.Items className="absolute right-0 mt-4 w-[212px] origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active } : { active : any }) => (
                            <button
                              onClick={()=>setEditModal(true)}
                              className={`${
                                active ? 'bg-blue-100' : 'text-black'
                              } group flex w-full items-center rounded-lg px-2 py-2 text-sm`}
                            >
                              Edytuj
                            </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active } : { active : any }) => (
                            <button
                              onClick={()=>setEditModal(true)}
                              className={`${
                                active ? 'bg-blue-100' : 'text-black'
                              } group flex w-full items-center rounded-lg px-2 py-2 text-sm`}
                            >
                              Pokaż zakończone edycje
                            </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active } : { active : any }) => (
                          <button
                            onClick={()=>setRemoveModal(true)}
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
          <Toolbar sort={true} filter={true} search={true} sortOptions={testSortOptions} searchPlaceholder='Szukaj edycji'/>
          <h2 className='text-lg font-semibold'>Aktywne edycje</h2>
          <EditionList editionData={editionData} type={Status.ACTIVE} />

          <hr className='w-full mt-2 border-1 border-blue-800'></hr>

          <h2 className='text-lg font-semibold'>Zakończone edycje</h2>
          <EditionList editionData={editionData} type={Status.INACTIVE} />
        </ContentPanel>
    </ContentLayout>
  )
}
