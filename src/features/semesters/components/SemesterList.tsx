import { Box } from 'components'
import { CustomOptionMenuItem, OptionsMenu } from 'components/OptionsMenu'
import { Spinner } from 'components/Spinner'
import { queryClient } from 'lib/react-query'
import { listenerCount } from 'process'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { activateSemester } from '../api/activateSemester'
import { activeSemester } from '../api/activeSemester'
import { getSemesters } from '../api/getSemesters'
import { Semester } from '../types'
import { ActivateModal } from './ActivateModal'
import { EditModal } from './EditModal'
import { RemoveModal } from './RemoveModal'

interface ISemesterList {
    allRefetch: (...args : any[]) => void,
    // activateSemesterRefetch: () => void,
}

export const SemesterList = ({allRefetch} : ISemesterList) => {
    const [removeModal, setRemoveModal] = React.useState(false)
    const [editModal, setEditModal] = React.useState(false)
    const [activateModal, setActivateModal] = React.useState(false)
    const [selectedSemester, setSelectedSemester] = React.useState<Semester>()

    // const { data: activateSemesterData, status: activateSemesterStatus, refetch: activateSemesterRefetch } = useQuery(['activateSemester', selectedSemester], () => activateSemester(selectedSemester?.id), {
    //     refetchOnWindowFocus: false,
    //     enabled: false // disable this query from automatically running
    // })
    
    const { data: semestersData, status: semestersStatus, refetch: semestersRefetch } = useQuery(['semesters'], () => getSemesters(false))

    const customMenuItems = (id: string) : CustomOptionMenuItem[] => [
        {
            text: 'Ustaw jako bieżący',
            onClick: async () => {
                setActivateModal(true)
            },
        }
    ]
    
    if (semestersStatus == 'loading') {
        return (
          <div className='w-full h-full flex justify-center items-center'>
            <Spinner />
          </div>
        )
    }    

    const removeName = 'Usuń semestr ' + selectedSemester?.start_year + ' - ' + (selectedSemester?.winter ? 'Zima' : 'Lato')
    const activateName = 'Zmień bieżący semestr na ' + selectedSemester?.start_year + '/' + selectedSemester?.start_year + 1 + ' - ' + (selectedSemester?.winter ? 'Zima' : 'Lato')

    return (
        <>
        <RemoveModal show={removeModal} off={() => setRemoveModal(false)} id={selectedSemester?.id} name={removeName} refetch={() => allRefetch()}/>
        <ActivateModal show={activateModal} off={() => setActivateModal(false)} id={selectedSemester?.id} name={activateName} allRefetch={allRefetch}/>
        <div className='w-full h-full flex flex-col items-center'>
            { semestersData.length == 0 ? 
                <div className='w-full h-full flex justify-center items-center p-10 font-semibold text-xl'> Brak Semestrów </div> :
                semestersData.map(function(semester : Semester) {
                    return (
                    <div className='w-full' key={semester.id}>
                        <Box color={semester.active ? 'bg-blue-800' : 'bg-red-500'}>
                            <div className='flex justify-between'>
                                <div className='flex flex-col gap-1'>
                                    <span className='font-semibold text-xl'> { semester.start_year }/{semester.start_year + 1} - {semester.winter ? 'Zima' : 'Lato'}</span>
                                    <span className='font-normal text-base text-red-600'>Nieaktywny</span>
                                </div>
                                <OptionsMenu onClick={() => setSelectedSemester(semester)} remove={() => setRemoveModal(true)} customMenuItems={customMenuItems(semester.id)}/>
                            </div>
                        </Box>
                    </div>
                    )
                }) }
        </div>
        </>
    )
}