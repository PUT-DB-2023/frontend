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
import { EditCodesModal } from '../components/EditCodesModal'
import AuthContext from 'context/AuthContext';

export const Server = () => {
  const [showRemove, setShowRemove] = React.useState(false)
  const [showEdit, setShowEdit] = React.useState(false)
  const [showEditCodesModal, setShowEditCodesModal] = React.useState(false);
  const { id } = useParams()
  const { authUser, checkPermission } = React.useContext(AuthContext)

  const { data: serverData, status: serverStatus, refetch: serverRefetch } = useQuery<TServer, Error>(['server', id], () => getServer(id))

  const activation = React.useCallback(() => {
    serverData && id && activeServer({ id: id, active: serverData.active, refresh: serverRefetch });
    serverRefetch()
  }, [serverData, serverStatus, id, serverRefetch])

  React.useEffect(() => { document.title = `Serwer: ${serverData?.name ? serverData?.name : ''}` }, [serverData?.name])

  if (serverStatus === 'loading' || !serverData) {
    return null
  }

  return (
    <ContentLayout>
      {checkPermission('database.delete_server') && <RemoveModal off={() => setShowRemove(false)} show={showRemove} id={id} name={serverData.name} />}
      {checkPermission('database.change_server') && <EditModal off={() => setShowEdit(false)} show={showEdit} refetch={serverRefetch} data={{ ...serverData, id: id as string }} />}
      {checkPermission('database.change_server') && <EditCodesModal off={() => setShowEditCodesModal(false)} show={showEditCodesModal} refetch={serverRefetch} data={{ ...serverData, id: id as string }} />}
      <ContentPanel type={PanelType.HEADER}>
        <div className='flex-col'>
          <h1 className='text-black text-3xl font-bold mb-4'> Serwer - {serverData.name}</h1>
        </div>
        <div className='flex items-start'>
        <div className='flex gap-6 items-center'>
            {checkPermission('database.change_server') && (serverData.active ?
              <Button type={ButtonType.WARNING} text='Deaktywuj' onClick={activation} /> :
              <Button type={ButtonType.ACTION} text='Aktywuj' onClick={activation} />
            )}
            <OptionsMenu
              edit={checkPermission('database.change_server') ? (() => setShowEdit(true)) : undefined}
              remove={checkPermission('database.delete_server') ? (() => setShowRemove(true)) : undefined}
            />
          </div>
        </div>
      </ContentPanel>
      <ContentPanel type={PanelType.CONTENT}>
        <h2 className='text-lg font-semibold'> Szczegóły </h2>
        <ServerInfo serverData={serverData} />
      </ContentPanel>
      <ContentPanel type={PanelType.CONTENT}>
        <div className='flex justify-between'>
          <h2 className='text-lg font-semibold'> Szablony poleceń  </h2>
          <div className='flex justify-between gap-6'>
            {checkPermission('database.change_server') && <Button type={ButtonType.ACTION} text='Edytuj' onClick={() => setShowEditCodesModal(true)} />}
          </div>
        </div>
        <div className='flex flex-col gap-6 p-4'>
          <div className='flex flex-col gap-2'>
            <h3 className='text-black text-base font-semibold'> Tworzenie użytkownika </h3>
            <h4 className='text-slate-600 text-base'>{serverData.create_user_template}</h4>
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='text-black text-base font-semibold'> Modyfikowanie użytkownika </h3>
            <h4 className='text-slate-600 text-base'>{serverData.modify_user_template}</h4>
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='text-black text-base font-semibold'> Usuwanie użytkownika </h3>
            <h4 className='text-slate-600 text-base'>{serverData.delete_user_template}</h4>
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='text-black text-base font-semibold'> Szablon nazewnictwa kont </h3>
            <h4 className='text-slate-600 text-base'>{serverData.username_template}</h4>
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='text-black text-base font-semibold'> Szablon niestandardowy </h3>
            <h4 className='text-slate-600 text-base'>{serverData.custom_command_template}</h4>
          </div>
        </div>
      </ContentPanel>
    </ContentLayout>
  )
}
