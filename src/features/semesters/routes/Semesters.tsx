import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import { Spinner } from 'components/Spinner'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { ButtonType, PanelType, Status } from 'types'
import { getSemesters } from '../api/getSemesters'
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
import { Semester } from '../types'
import { activateSemester } from '../api/activateSemester'

export const Semesters = () => {
  const [removeModal, setRemoveModal] = React.useState(false)
  const [editModal, setEditModal] = React.useState(false)
  const [addModal, setAddModal] = React.useState(false)
  const [selectedSemester, setSelectedSemester] = React.useState<Semester>()

  const { id } = useParams()

  const activeSemesterQuery = useQuery(['activeEditions', id], () => getSemesters(true));
  const allSemestersQuery = useQuery(['allEditions', id], () => getSemesters());
  const { data : activeSemesterData, status : activeSemesterStatus, refetch : activeSemesterRefetch } = activeSemesterQuery;
  const { data : allSemestersData, status : allSemestersStatus, refetch : allSemestersRefetch } = allSemestersQuery;

  useEffect(() => {
    if (activeSemesterData !== undefined) {
      setSelectedSemester(activeSemesterData[0])
    } 
  }, [activeSemesterData])

  const activation = React.useCallback( async ()=>{
    await activateSemester(selectedSemester?.id);
    allRefetch()
  },[allSemestersQuery, selectedSemester])

  if (activeSemesterStatus == 'loading' || allSemestersStatus == 'loading' || selectedSemester === undefined) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }

  const allRefetch = () => {
    activeSemesterRefetch();
    allSemestersRefetch();
  }
  
  const removeName = 'Usuń semestr ' + selectedSemester.start_year + ' - ' + (selectedSemester.winter ? 'Zima' : 'Lato')

  return (
    <ContentLayout>
        <RemoveModal show={removeModal} off={() => setRemoveModal(false)} id={selectedSemester.id} name={removeName} refetch={() => allRefetch()}/>
        <EditModal refetch={() => allRefetch()} show={editModal} off={() => setEditModal(false)} data={selectedSemester} />
        <AddNewModal show={addModal} off={() => setAddModal(false)} refetch={() => allRefetch()}/>
        <ContentPanel type={PanelType.HEADER}> 
          <div className='flex-col'>
            <h1 className='text-black text-3xl font-bold mb-4'> Semestry </h1>
          </div>
          <div className='flex gap-6'>
            <Button type={ButtonType.ACTION} text='Dodaj semestr' onClick={()=>setAddModal(true)}/>
          </div>
        </ContentPanel>
        <ContentPanel type={PanelType.CONTENT}>
          <div className='flex justify-between'>
            <div className='flex flex-col gap-6'>
              <h2 className='text-lg font-semibold'>Wybrany semestr</h2>
              <div className='flex flex-col gap-4'>
              <h1 className='text-3xl font-bold'>
                {selectedSemester ? selectedSemester?.start_year.toString().concat(selectedSemester.winter ? " - Zima" : " - Lato") : 'Brak semestrów'}
              </h1>
              <h2 className={`text-lg font-semibold ${selectedSemester?.active ? 'text-blue-600' : 'text-red-500'}`}>
                {selectedSemester ? selectedSemester?.active ? 'Aktywny' : 'Nieaktywny' : ''}
              </h2>
              </div>
            </div>
            <div className='flex gap-6'>
              {!selectedSemester.active &&  <Button text={"Aktywuj"} type={ButtonType.ACTION} onClick={activation}/>}
              <Listbox value={selectedSemester} onChange={setSelectedSemester}>
                  <div className="relative w-[232px]">
                      <Listbox.Button className='relative w-full cursor-pointer text-zinc-600 rounded-lg border border-zinc-400 flex px-1 justify-between items-center h-9 hover:border-zinc-500 focus:border-blue-800'>
                          {/* <ChevronDownIcon className='h-6 w-auto text-zinc-600 hover:cursor-pointer'/> */}
                          <span className='flex justify-start w-full px-2'>
                            {selectedSemester!.start_year} - {selectedSemester!.winter ? "Zima" : "Lato"}
                          </span>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-600">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                          </svg>
                      </Listbox.Button>
                      <Listbox.Options className='absolute p-1 w-full overflow-auto rounded-lg shadow-xl bg-white max-h-56'>
                          {allSemestersData.sort((a : Semester, b : Semester) => (b.start_year.localeCompare(a.start_year) || Number(b.winter) - Number(a.winter))).map((semester : Semester) => (
                              <Listbox.Option className='px-9 py-[6px] hover:bg-blue-100 cursor-pointer rounded-lg'
                                  key={semester.id}
                                  value={semester}
                              >
                                  {({ selected }) => (         
                                      <>                   
                                          <span className={selected ? `font-bold` : `font-normal`}>{semester.start_year} - {semester.winter ? "Zima" : "Lato"}</span>
                                      </>
                                  )}
                              </Listbox.Option>
                          ))}
                      </Listbox.Options>
                  </div>
                </Listbox>
                <OptionsMenu edit={() => setEditModal(true)} remove={() => setRemoveModal(true)}></OptionsMenu>
            </div>            
          </div>
        </ContentPanel>
    </ContentLayout>
  )
}
