import { Box, ContentLayout } from 'components'
import { Button } from 'components/Button'
import { EditionList } from 'features/editions/components/EditionList'
import React from 'react'
import { useParams } from 'react-router-dom'
import { ButtonTypes } from 'types'
import { courseList } from '../api/getCourses'

const Header = () => {
  let { id } : any = useParams()
  return (
    <div className='flex w-full shadow-md bg-white p-12 z-10 relative gap-8'>
      <div className='flex flex-col'>
        <h1 className='text-black text-3xl font-bold mb-4'>{id != undefined ? courseList[id].name : ''}</h1>
        <h2 className='text-blue-700 font-semibold mb-8'>3 aktywne edycje</h2>
        <h3 className='text-slate-500 text-base text-justify'>Celem przedmiotu jest zapoznanie studentów z podstawowymi pojęciami i koncepcjami technologii systemów baz danych niezbędnymi do poprawnego projektowania, korzystania i implementacji systemów baz danych i ich aplikacji. W ramach tego przedmiotu studenci zapoznają się głównie z podstawowymi koncepcjami przetwarzania transakcyjnego, zarządzaniem współbieżnym wykonywaniem transakcji, optymalizacją zapytań, odtwarzaniem spójnego stanu bazy danych po awarii, zarządzaniem buforem danych, zarządzaniem plikiem logu, oraz organizacją struktur indeksów wykorzystywanych w systemach baz danych.</h3>
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
