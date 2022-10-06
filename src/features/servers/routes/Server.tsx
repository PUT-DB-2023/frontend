import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import { Spinner } from 'components/Spinner'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { ButtonType, PanelType } from 'types'
import { getServer } from '../api/getServer'
import { ServerInfo } from '../components/ServerInfo'

export const Server = () => {
  const { id } = useParams()
  console.log(id)

  const serverQuery = useQuery(['server', id], () => getServer( id ))

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
        <ContentPanel type={PanelType.LARGE}> 
          <div className='flex-col'>
            <h1 className='text-black text-3xl font-bold mb-4'> Serwer - { serverQuery.data.name }</h1>
            <h2 className='text-blue-900 font-semibold mb-8'>Detale</h2>
          </div>
          <div className='flex gap-4'>
            <Button type={ButtonType.OUTLINE} text='Edytuj'/>
            <Button type={ButtonType.WARNING} text='Usuń'/>
          </div>
        </ContentPanel>
        <ContentPanel type={PanelType.LARGE}>
          <ServerInfo serverData={serverQuery.data} />
        </ContentPanel>
    </ContentLayout>
  )
}
