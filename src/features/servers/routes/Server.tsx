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
import { activeServer } from '../api/activeServer'
import { OptionsMenu } from 'components/OptionsMenu'
import { Server as TServer } from '../types'

export const Server = () => {
  const [showRemove, setShowRemove] = React.useState(false)
  const [showEdit, setShowEdit] = React.useState(false)
  const { id } = useParams()

  const serverQuery = useQuery<TServer, Error>(['server', id], () => getServer( id! ))
  const refetch = serverQuery.refetch;

  const activation = React.useCallback(()=>{
    serverQuery.data && id && activeServer({id: id, active: serverQuery.data.active, refresh: refetch});
    serverQuery.refetch()
  },[serverQuery, id, refetch])

  if (serverQuery.isLoading || !serverQuery.data) {
    return (
      <Spinner />
    );
  }

  return (
    <ContentLayout>
      <RemoveModal off={()=>setShowRemove(false)} show={showRemove} id={id} name={serverQuery.data.name}/>
      <EditModal off={()=>setShowEdit(false)} show={showEdit} refetch={serverQuery.refetch} data={{...serverQuery.data, id: id as string}}/>
        <ContentPanel type={PanelType.HEADER}>
          <div className='flex-col'>
            <h1 className='text-black text-3xl font-bold mb-4'> Serwer - { serverQuery.data.name }</h1>
          </div>
          <div className='flex items-start'>
            <div className='flex gap-6'>
              {serverQuery.data.active ? 
                <Button type={ButtonType.WARNING} text='Deaktywuj' onClick={activation}/> :
                <Button type={ButtonType.ACTION} text='Aktywuj' onClick={activation}/>
              } 
              <OptionsMenu edit={() => setShowEdit(true)} remove={() => setShowRemove(true)} />
            </div>
          </div>
        </ContentPanel>
        <ContentPanel type={PanelType.CONTENT}>
          <h2 className='text-lg font-semibold'> Szczegóły </h2>
          <ServerInfo serverData={serverQuery.data} />
        </ContentPanel>
        <ContentPanel type={PanelType.CONTENT}>
          <h2 className='text-lg font-semibold'> Polecenia bazodanowe </h2>
          <div className='flex flex-col gap-6 p-4'>
            <div className='flex flex-col gap-2'>
              <h3 className='text-black text-base font-semibold'> Tworzenie użytkownika </h3>
              <h4 className='text-slate-600 text-base'>{serverQuery.data.create_user_template}</h4>
            </div>

            <div className='flex flex-col gap-2'>
              <h3 className='text-black text-base font-semibold'> Modyfikowanie użytkownika </h3>
              <h4 className='text-slate-600 text-base'>{serverQuery.data.create_user_template}</h4>
            </div>

            <div className='flex flex-col gap-2'>
              <h3 className='text-black text-base font-semibold'> Usuwanie użytkownika </h3>
              <h4 className='text-slate-600 text-base'>{serverQuery.data.create_user_template}</h4>
            </div>
          </div>
        </ContentPanel>
    </ContentLayout>
  )
}
