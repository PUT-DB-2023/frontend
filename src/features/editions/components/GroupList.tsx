import { Box } from 'components'
import { Spinner } from 'components/Spinner'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { getEditionGroups } from '../api/getEditionGroups'
import { Group } from '../types'

export const GroupList = ({groupData} : any) => {
  const { id } = useParams()

  console.log(groupData)

  return (
    <div className='w-full h-full'>
        { groupData.length == 0 ? 
            <div className='w-full h-full flex justify-center items-center p-16 font-semibold text-xl'> Brak grup </div> :
            groupData.map(function(group : any) {
            return (
                      <Link to={'/groups/' + group.id}>
                        <Box>
                          <span className='font-semibold text-xl'> Grupa - { group.day + " " + group.hour}</span>
                          <span className='font-normal text-base text-blue-600'> { group.teacherEdition.teacher.first_name + " " + group.teacherEdition.teacher.last_name}</span>
                        </Box>
                      </Link>
                    )
        }) }
    </div>
  )
}