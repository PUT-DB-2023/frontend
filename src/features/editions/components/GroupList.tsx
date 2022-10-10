import { Box } from 'components'
import { Spinner } from 'components/Spinner'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { getEditionGroups } from '../api/getEditionGroups'
import { Group } from '../types'

export const GroupList = () => {
  const { id } = useParams()
  const groupsQuery = useQuery(['groups', id], () => getEditionGroups( id ))

  console.log(groupsQuery.data)

  // TODO move the mutations into separate files in the API directory (see bulletproof_react)

  if (groupsQuery.isLoading) {
    return (
      <Spinner />
    );
  }

  return (
    <div className='flex w-full flex-wrap gap-4'>
        { groupsQuery.data.map(function(group : any) {
            return <Link key={group.id} to= {'/groups/' + group.id}>
                      <Box>
                        <span className='font-semibold text-xl'> Group { group.name }</span>
                        <span className='font-normal text-base text-slate-600'> { group.day + " " + group.hour}</span>
                        <span className='font-normal text-base text-blue-600'> { group.teacherEdition.teacher.first_name + " " + group.teacherEdition.teacher.last_name}</span>
                      </Box>
                    </Link>
        }) }
    </div>
  )
}