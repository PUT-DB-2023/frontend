import { Box } from 'components'
import { OptionsMenu } from 'components/OptionsMenu'
import { Spinner } from 'components/Spinner'
import { listenerCount } from 'process'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { getSemesters } from '../api/getSemesters'
import { Semester } from '../types'
import { EditModal } from './EditModal'
import { RemoveModal } from './RemoveModal'

export const SemesterList = () => {

    const [removeModal, setRemoveModal] = React.useState(false)
    const [editModal, setEditModal] = React.useState(false)
    const { data: semestersData, status: semestersStatus, refetch: semestersRefetch } = useQuery(['semesters'], () => getSemesters(false))

    const [selectedSemester, setSelectedSemester] = React.useState<Semester>()
    
    useEffect(() => {
        console.log(selectedSemester);
      
    }, [selectedSemester])

    if (semestersStatus == 'loading') {
        return (
          <div className='w-full h-full flex justify-center items-center'>
            <Spinner />
          </div>
        )
    }    

    const removeName = 'Usuń semestr ' + selectedSemester?.start_year + ' - ' + (selectedSemester?.winter ? 'Zima' : 'Lato')

    return (
        <>
        <EditModal refetch={() => semestersRefetch()} show={editModal} off={() => setEditModal(false)} data={selectedSemester!} />
        <RemoveModal show={removeModal} off={() => setRemoveModal(false)} id={selectedSemester?.id} name={removeName} refetch={() => semestersRefetch()}/>
        <div className='w-full h-full flex flex-col items-center'>
            { semestersData.length == 0 ? 
                <div className='w-full h-full flex justify-center items-center p-10 font-semibold text-xl'> Brak Semestrów </div> :
                semestersData.map(function(semester : Semester) {
                    return (
                    <div className='w-full'>
                        <Box color={semester.active ? 'bg-blue-800' : 'bg-red-500'}>
                            <div className='flex justify-between'>
                                <div className='flex flex-col gap-1'>
                                    <span className='font-semibold text-xl'> { semester.start_year }/{semester.start_year + 1} - {semester.winter ? 'Zima' : 'Lato'}</span>
                                    <span className='font-normal text-base text-red-600'>Nieaktywny</span>
                                </div>
                                <OptionsMenu onClick={() => setSelectedSemester(semester)} edit={() => setEditModal(true)} remove={() => setRemoveModal(true)}/>
                            </div>
                        </Box>
                    </div>
                    )
                }) }
        </div>
        </>
    )
}
