import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import { Spinner } from 'components/Spinner'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { ButtonType, PanelType } from 'types'
import { getServer } from '../api/getServer'
import { ServerInfo } from '../components/ServerInfo'
import { RemoveModal } from '../components/RemoveModal'
import { EditModal } from '../components/EditModal'
import * as React from 'react'
import { Menu } from '@headlessui/react'
import { DotsHorizontalIcon } from '@heroicons/react/solid'

export const Server = () => {
  const [showRemove, setShowRemove] = React.useState(false)
  const [showEdit, setShowEdit] = React.useState(false)
  const { id } = useParams()

  const serverQuery = useQuery(['server', id], () => getServer( id ))
  // const {data: serverQuery } = useQuery(['server', id], () => getServer( id ))
  console.log(serverQuery.data)

  if (serverQuery.isLoading) {
    return (
      <Spinner />
    );
  }
  else if (serverQuery.isError) {
    return (
      <div>
        Error!
      </div>
    );
  }

  return (
    <ContentLayout>
      <RemoveModal off={()=>setShowRemove(false)} show={showRemove} id={id} name={serverQuery.data.name}/>
      <EditModal off={()=>setShowEdit(false)} show={showEdit} refetch={serverQuery.refetch} data={{id: id as string, ...serverQuery.data}}/>
        <ContentPanel type={PanelType.HEADER}> 
          <div className='flex-col'>
            <h1 className='text-black text-3xl font-bold mb-4'> Serwer - { serverQuery.data.name }</h1>
            <h2 className='text-blue-900 font-semibold mb-8'>Detale</h2>
          </div>
          <div className='flex items-start'>
            <div className='flex gap-6'>
              <Button type={ButtonType.WARNING} text='Deaktywuj' onClick={()=>console.log('DEACTIVATE')}/>
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
                              onClick={()=>setShowEdit(true)}
                              className={`${
                                active ? 'bg-zinc-300' : 'text-black'
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              Edytuj
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
          <ServerInfo serverData={serverQuery.data} />
        </ContentPanel>
    </ContentLayout>
  )
}
