import { Box, ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import { getEditions } from 'features/editions/api/getEditions'
import { EditionList } from 'features/editions/components/EditionList'
import { EditionRow } from 'features/editions/components/EditionRow'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { ButtonType, PanelType } from 'types'
import { getCourse } from '../api/getCourse'

const Header = () => {
  const { id } = useParams()
  const courseQuery = useQuery('course', () => getCourse( { courseId : id }))
  // const editionsQuery = useQuery('editions', () => getEditions( { editionId : id }))

  if (courseQuery.isLoading) {
    return (
      <div>
        Loading..
      </div>
    );
  }

  return (
    <div className='flex w-full shadow-md bg-white p-9 rounded-md z-10 relative gap-9'>
      <div className='flex flex-col'>
        <h1 className='text-black text-3xl font-bold mb-4'>{ courseQuery.data.name }</h1>
        <h2 className='text-blue-700 font-semibold mb-8'>3 aktywne edycje</h2>
        <h3 className='text-slate-500 text-base text-justify'>{ courseQuery.data.description }</h3>
      </div>
      <div className='flex gap-4'>
        <Button type={ButtonType.OUTLINE} text='Edytuj'/>
        <Button type={ButtonType.WARNING} text='Usuń'/>
      </div>
    </div>
  )
}

export const Course = () => {

  const { id } = useParams()
  const courseQuery = useQuery('course', () => getCourse( { courseId : id }))
  // const editionsQuery = useQuery('editions', () => getEditions( { editionId : id }))

  if (courseQuery.isLoading) {
    return (
      <div>
        Loading..
      </div>
    );
  }
  
  return (
    <ContentLayout>
        <ContentPanel type={PanelType.HEADER}> 
          <div className='flex-col'>
            <h1 className='text-black text-3xl font-bold mb-4'>{ courseQuery.data.name }</h1>
            <h2 className='text-blue-900 font-semibold mb-8'>3 aktywne edycje</h2>
            <h3 className='text-slate-500 text-base text-justify'>{ courseQuery.data.description }</h3>
          </div>
          <div className='flex gap-4'>
            <Button type={ButtonType.OUTLINE} text='Edytuj'/>
            <Button type={ButtonType.WARNING} text='Usuń'/>
          </div>
        </ContentPanel>

        <ContentPanel type={PanelType.CONTENT}>
          <h2 className='text-lg font-semibold'>Aktywne edycje</h2>
          <hr className='w-full mt-2 border-1 border-blue-800'></hr>
          <div className='pt-10 h-full overflow-y-auto'>
            <EditionRow>
            </EditionRow>
            <EditionRow />
          </div>
        </ContentPanel>

        <ContentPanel type={PanelType.CONTENT}> 
          <h2 className='text-lg font-semibold'>Zakończone edycje</h2>
          <hr className='w-full mt-2 border-1 border-blue-800'></hr>
          <div className='pt-10 h-full overflow-y-auto'>
            <EditionRow color='bg-red-500'>
            </EditionRow>
            <EditionRow color='bg-red-500' />
            <EditionRow color='bg-red-500' />
            <EditionRow color='bg-red-500' />
          </div>
        </ContentPanel>
    </ContentLayout>
  )
}
