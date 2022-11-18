import { Box } from 'components'
import { Spinner } from 'components/Spinner'
import { Group } from 'features/groups/types'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { getEditionGroups } from '../api/getEditionGroups'

interface IGroupList {
  groupData : Group[];
}

export const GroupList = ({groupData} : IGroupList) => {
  const { id } = useParams()

  if (groupData !== undefined) {
    return (
      <div className='w-full h-full'>
          { groupData.length == 0 ? 
              <div className='w-full h-full flex justify-center items-center p-10 font-semibold text-xl'> Brak Grup </div> :
              groupData.map(function(group : Group) {
              return (
                <Link to={'/groups/' + group.id}>
                  <Box>
                    <span className='font-semibold text-xl'> {group.name} - { group.day + " " + group.hour}</span>
                    <span className='font-normal text-base text-blue-800'> { group.teacherEdition.teacher.first_name + " " + group.teacherEdition.teacher.last_name}</span>
                  </Box>
                </Link>
              )
          }) }
      </div>
    )
  }
  
  return <></>
}