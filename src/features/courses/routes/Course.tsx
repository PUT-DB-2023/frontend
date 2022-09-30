import { Box, ContentLayout } from 'components'
import { Button } from 'components/Button'
import { getEditions } from 'features/editions/api/getEditions'
import { EditionList } from 'features/editions/components/EditionList'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { ButtonTypes } from 'types'
import { getCourse } from '../api/getCourse'

const Header = () => {
  const { id } = useParams()
  console.log('a', typeof 'a')
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
    <div className='flex w-full shadow-md bg-white p-12 z-10 relative gap-8'>
      <div className='flex flex-col'>
        <h1 className='text-black text-3xl font-bold mb-4'>{ courseQuery.data.name }</h1>
        <h2 className='text-blue-700 font-semibold mb-8'>3 aktywne edycje</h2>
        <h3 className='text-slate-500 text-base text-justify'>{ courseQuery.data.description }</h3>
      </div>
      <div className='flex gap-4'>
        <Button type={ButtonTypes.outline} text='Edytuj'/>
        <Button type={ButtonTypes.warning} text='Usuń'/>
      </div>
    </div>
  )
}

export const Course = () => {
  
  return (
    <ContentLayout header={<Header />}>
        <EditionList></EditionList>
    </ContentLayout>
  )
}
