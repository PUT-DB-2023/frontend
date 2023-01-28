import { Box } from 'components'
import { Loading } from 'components/Loading'
import { CustomOptionMenuItem, OptionsMenu } from 'components/OptionsMenu'
import AuthContext from 'context/AuthContext'
import React from 'react'
import { useQuery } from 'react-query'
import { getSemesters } from '../api/getSemesters'
import { Semester } from '../types'
import { ActivateModal } from './ActivateModal'
import { RemoveModal } from './RemoveModal'

interface ISemesterList {
    allRefetch: (...args: any[]) => void,
}

export const SemesterList = ({ allRefetch }: ISemesterList) => {
    const [removeModal, setRemoveModal] = React.useState(false)
    const [activateModal, setActivateModal] = React.useState(false)
    const [selectedSemester, setSelectedSemester] = React.useState<Semester>()
    const { checkPermission } = React.useContext(AuthContext)

    const { data: semestersData, status: semestersStatus, refetch: semestersRefetch } = useQuery(['inactiveSemesters'], () => getSemesters(false))

    const customMenuItems = (semester: Semester): CustomOptionMenuItem[] => [
        {
            text: 'Ustaw jako bieżący',
            onClick: async () => {
                setSelectedSemester(semester);
                setActivateModal(true)
            },
        }
    ]

    if (semestersStatus == 'loading') {
        return <Loading />
    }

    return (
        <>
            {checkPermission('database.delete_semester') && <RemoveModal show={removeModal} off={() => setRemoveModal(false)} semester={selectedSemester} refetch={() => allRefetch()} />}
            {checkPermission('database.change_active_semester') && <ActivateModal show={activateModal} off={() => setActivateModal(false)} semester={selectedSemester} allRefetch={allRefetch} />}
            <div className='w-full h-full flex flex-col items-center'>
                {semestersData.length == 0 ?
                    <div className='w-full h-full flex justify-center items-center p-10 font-semibold text-xl'> Brak Semestrów </div> :
                    semestersData.map(function (semester: Semester) {
                        return (
                            <div className='w-full' key={semester.id}>
                                <Box color={semester.active ? 'bg-blue-800' : 'bg-red-500'}>
                                    <div className='flex justify-between'>
                                        <div className='flex flex-col gap-1'>
                                            <span className='font-semibold text-xl'> {semester.start_year}/{semester.start_year + 1} - {semester.winter ? 'Zima' : 'Lato'}</span>
                                            <span className='font-normal text-base text-red-600'>Nieaktywny</span>
                                        </div>
                                        <OptionsMenu
                                            remove={checkPermission('database.delete_semester') ? (() => { setSelectedSemester(semester); setRemoveModal(true) }) : undefined}
                                            customMenuItems={checkPermission('database.change_active_semester') ? customMenuItems(semester) : undefined}
                                        />
                                    </div>
                                </Box>
                            </div>
                        )
                    })}
            </div>
        </>
    )
}
