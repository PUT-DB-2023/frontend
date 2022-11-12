import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import { Spinner } from 'components/Spinner'
import React from 'react'
import { useQuery } from 'react-query'
import { ButtonType, PanelType, Status } from 'types'
import { getSemesters } from '../api/getSemesters'
import { SemesterList } from '../components/SemesterList'
import { AddNewModal } from '../components/AddNewModal'
import { Toolbar } from 'components/Toolbar'
import { Listbox, Menu } from '@headlessui/react'
import { DotsHorizontalIcon } from '@heroicons/react/solid'
import { semestersSortOptions } from 'types'
import { sortFunc } from 'api/sortFilter'
import { searchFunc } from 'api/searchApi'
import { useParams } from 'react-router-dom'
import { RemoveModal } from '../components/RemoveModal'
import { EditModal } from '../components/EditModal'
import { OptionsMenu } from 'components/OptionsMenu'
import { GroupList } from 'features/editions/components/GroupList'

export const Semesters = () => {
  const [removeModal, setRemoveModal] = React.useState(false)
  const [editModal, setEditModal] = React.useState(false)
  const [addEditionModal, setAddEditionModal] = React.useState(false)
  const [sortBy, setSortBy] = React.useState(semestersSortOptions[0])
  const [filterBy, setFilterBy] = React.useState(null)
  const [search, setSearch] = React.useState('')

  const { id } = useParams()

  const activeSemesterQuery = useQuery(['editions', id], () => getSemesters(true));
  const allSemestersQuery = useQuery(['editions', id], () => getSemesters());
  const { data : activeSemesterData, status : activeSemesterStatus, refetch : activeSemesterRefetch } = activeSemesterQuery;

  if (activeSemesterStatus == 'loading') {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }
  
  console.log(activeSemesterData)
  
  return (
    <ContentLayout>
        <RemoveModal show={removeModal} off={() => setRemoveModal(false)} id={id} name={activeSemesterData.name} />
        {/* <EditModal refetch={() => activeSemesterRefetch()} show={editModal} off={() => setEditModal(false)} data={activeSemesterData} /> */}
        {/* {id && <AddNewModal show={addEditionModal} off={() => setAddEditionModal(false)} refetch={() => activeSemesterRefetch()} courseId={id}/> } */}
        <ContentPanel type={PanelType.HEADER}> 
          <div className='flex-col'>
            <h1 className='text-black text-3xl font-bold mb-4'> Semestry </h1>
          </div>
          <div className='flex gap-6'>
            <Button type={ButtonType.ACTION} text='Dodaj semestr' onClick={()=>setAddEditionModal(true)}/>
          </div>
        </ContentPanel>
        <ContentPanel type={PanelType.CONTENT}>
          <div className='flex justify-between'>
            <div className='flex flex-col gap-6'>
              <h2 className='text-lg font-semibold'>Aktywny semestr</h2>
              <div className='flex flex-col gap-4'>
                <h1 className='text-3xl font-bold'>
                  { activeSemesterData[0].year + " - "}
                  { activeSemesterData[0].winter ? "Zima" : "Lato"}
                </h1>
              </div>
            </div>
            <div className='flex gap-6'>
              <Listbox value={sortBy} onChange={setSortBy}>
                  <div className="relative w-[232px]">
                      <Listbox.Button className='relative w-full cursor-pointer text-zinc-600 rounded-lg border border-zinc-400 flex px-1 justify-between items-center h-9 hover:border-zinc-500 focus:border-blue-800'>
                          {/* <ChevronDownIcon className='h-6 w-auto text-zinc-600 hover:cursor-pointer'/> */}
                          <span className='flex justify-start w-full px-2'>
                              {sortBy.name}: {sortBy.asc ? "rosnąco" : "malejąco"}
                          </span>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-600">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                          </svg>
                      </Listbox.Button>
                      <Listbox.Options className='absolute p-1 w-full overflow-auto rounded-lg shadow-xl bg-white'>
                          {/* {sortOptions.map((sortOption) => (
                              <Listbox.Option className='px-9 py-[6px] hover:bg-blue-100 cursor-pointer rounded-lg'
                                  key={sortOption.field + sortOption.asc}
                                  value={sortOption}
                              >
                                  {({ selected }) => (         
                                      <>                   
                                          <span className={selected ? `font-bold` : `font-normal`}>{sortOption.name}: {sortOption.asc ? "rosnąco" : "malejąco"}</span>
                                      </>
                                  )}
                              </Listbox.Option>
                          ))} */}
                      </Listbox.Options>
                  </div>
                </Listbox>
                <OptionsMenu edit={() => console.log(true)} remove={() => console.log(true)}></OptionsMenu>
            </div>            
          </div>
        </ContentPanel>
    </ContentLayout>
  )
}
