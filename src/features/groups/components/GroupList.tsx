import { Box } from 'components';
import React from 'react'
import { Link } from 'react-router-dom';
import { Status } from 'types';
import { Group } from '../types';

interface IGroupList {
    groupData: Group[];
  }

export const GroupList = ({ groupData } : IGroupList) => {

  console.log(groupData)
    return (
      <div className='w-full'>
        { groupData.length == 0 ? 
        <div className='w-full h-full flex justify-center items-center p-10 font-semibold text-xl'> Brak Wyników </div> :
        groupData.map(function(group : Group) {
          return (
            <Link to={'/groups/' + group.id}>
              <Box>
                  <span className='font-semibold text-xl'> {group.name} - {group.teacherEdition.edition.course.name} - {group.teacherEdition.edition.semester.year} { group.teacherEdition.edition.semester.winter ? "Zima" : "Lato"}</span>
                  <span className='font-normal text-base'> 
                    {group.day} {group.hour} 
                  </span>
              </Box>
            </Link>
          )
        }) }
      </div>
    )
}
