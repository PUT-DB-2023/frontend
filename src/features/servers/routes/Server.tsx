import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { ButtonType, PanelType } from 'types'
import { getServer } from '../api/getServer'

export const Server = () => {
  const { id } = useParams()
  console.log(id)

  const editionQuery = useQuery('edition', () => getServer( id ))

  if (editionQuery.isLoading) {
    return (
      <div>
        Loading..
      </div>
    );
  }
  else if (editionQuery.isError) {
    return (
      <div>
        Error!
      </div>
    );
  }

  return (
    <ContentLayout>
        <ContentPanel type={PanelType.HEADER}> 
          <div className='flex-col'>
            <h1 className='text-black text-3xl font-bold mb-4'>{ editionQuery.data.name }</h1>
            <h2 className='text-blue-900 font-semibold mb-8'>Detale</h2>
          </div>
          <div className='flex gap-4'>
            <Button type={ButtonType.OUTLINE} text='Edytuj'/>
            <Button type={ButtonType.WARNING} text='Usuń'/>
          </div>
        </ContentPanel>
    </ContentLayout>
  )
}
