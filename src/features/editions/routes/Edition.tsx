import { ContentLayout, ContentPanel } from 'components';
import { Button } from 'components/Button';
import { Spinner } from 'components/Spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { ButtonType, PanelType, testSortOptions } from 'types';
import { getEdition } from '../api/getEdition';
import { getEditionGroups } from '../api/getEditionGroups';
import { GroupList } from '../components/GroupList';
import { RemoveModal } from '../components/RemoveModal';
import * as React from 'react'
import { Toolbar } from 'components/Toolbar';
import { Menu } from '@headlessui/react';
import { DotsHorizontalIcon } from '@heroicons/react/solid';

export const Edition = () => {
  const [showRemove, setShowRemove] = React.useState(false)
  const { id } = useParams()

  const { data : editionData, status : editionStatus, refetch : editionRefetch } = useQuery(['edition', id], () => getEdition(id))
  const { data : groupData, status : groupStatus, refetch : groupRefetch } = useQuery(['editionGroups', id], () => getEditionGroups(id))

  if (editionStatus === 'loading' || groupStatus === 'loading') {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }

  console.log(editionData)
  
  return (
    <ContentLayout>
      <RemoveModal off={()=>setShowRemove(false)} show={showRemove} id={id} name={DataTransfer.name} courseId={editionData.course.id}/>
        <ContentPanel type={PanelType.HEADER}> 
          <div className='flex-col'>
            <h1 className='text-black text-3xl font-bold mb-4'>
              { editionData.course.name + " " + editionData.semester.year + " - "}
              { editionData.semester.winter ? "Zima" : "Lato"}
            </h1>
            <h2 className='text-blue-900 font-semibold mb-8'>{ groupData.length } grupy</h2>
          </div>
          <div className='flex items-start'>
            <div className='flex gap-6'>
                {editionData.active ? 
                  <Button type={ButtonType.WARNING} text='Zakończ' onClick={()=>console.log('END EDITION')}/> :
                  <Button type={ButtonType.ACTION} text='Wznów' onClick={()=>console.log('RESUME EDITION')}/>
                } 
              <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="flex text-black items-center space-x-4">
                      <DotsHorizontalIcon className='w-7 h-auto cursor-pointer hover:text-zinc-500'/>
                    </Menu.Button>
                  </div>
                    <Menu.Items className="absolute right-0 mt-4 w-[212px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          {({ active } : { active : any }) => (
                              <button
                                onClick={()=>console.log('EDIT')}
                                className={`${
                                  active ? 'bg-blue-100' : 'text-black'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                Edytuj
                              </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active } : { active : any }) => (
                              <button
                                onClick={()=>console.log('SHOW INACTIVE')}
                                className={`${
                                  active ? 'bg-blue-100' : 'text-black'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                Pokaż nieaktywne grupy
                              </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active } : { active : any }) => (
                            <button
                              onClick={()=>setShowRemove(true)}
                              className={`${
                                active ? 'bg-red-500 text-white' : 'text-red-500'
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
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
          <Toolbar sortOptions={testSortOptions} searchPlaceholder='Szukaj grupy'/>
          <GroupList groupData={groupData}></GroupList>
        </ContentPanel>
    </ContentLayout>
  )
}
