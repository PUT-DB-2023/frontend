import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import { Spinner } from 'components/Spinner'
import { getEditions } from 'features/editions/api/getEditions'
import { EditionList } from 'features/editions/components/EditionList'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { ButtonType, EditionStatus, PanelType } from 'types'
import { getCourse } from '../api/getCourse'

// TODO Add the edition fetching to the edition list component

export const Course = () => {

  const { id } = useParams()

  let courseQuery = useQuery(['course', id], () => getCourse( id )) // refetch when id changes
  const editionsQuery = useQuery(['editions', id], () => getEditions( id ))

  console.log(id, courseQuery.data)

  if (courseQuery.isLoading) {
    return (
      <ContentPanel type={PanelType.LARGE}> 
        <Spinner />
      </ContentPanel>
    );
  }
  else if (courseQuery.isError) {
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
            <h1 className='text-black text-3xl font-bold mb-4'>{ courseQuery.data.name }</h1>
            <h2 className='text-blue-900 font-semibold mb-8'> { editionsQuery.data !== undefined ? editionsQuery.data.length : '' } edycje </h2>
            <h3 className='text-slate-500 text-base text-justify'>{ courseQuery.data.description }</h3>
          </div>
          <div className='flex gap-4'>
            <Button type={ButtonType.OUTLINE} text='Edytuj'/>
            <Button type={ButtonType.WARNING} text='Usuń'/>
          </div>
        </ContentPanel>

        <ContentPanel type={PanelType.SMALL}>
          <h2 className='text-lg font-semibold'>Aktywne edycje</h2>
          <hr className='w-full mt-2 border-1 border-blue-800'></hr>
          <div className='pt-10 h-full overflow-y-auto'>
            <EditionList id={courseQuery.data.id} type={EditionStatus.ACTIVE} />
          </div>
        </ContentPanel>

        <ContentPanel type={PanelType.SMALL}> 
          <h2 className='text-lg font-semibold'>Zakończone edycje</h2>
          <hr className='w-full mt-2 border-1 border-blue-800'></hr>
          <div className='pt-10 h-full overflow-y-auto'>
            <EditionList id={courseQuery.data.id} type={EditionStatus.CLOSED} />
          </div>
        </ContentPanel>
    </ContentLayout>
  )
}
