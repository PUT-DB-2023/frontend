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
          <div className='flex gap-4'>
            <Button type={ButtonType.OUTLINE} text='Edytuj' onClick={()=>setShowEdit(true)}/>
            <Button type={ButtonType.WARNING} text='Usuń' onClick={()=>setShowRemove(true)}/>
          </div>
        </ContentPanel>
        <ContentPanel type={PanelType.HEADER}>
          <ServerInfo serverData={serverQuery.data} />
        </ContentPanel>
    </ContentLayout>
  )
}
