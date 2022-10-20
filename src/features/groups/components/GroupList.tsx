import { Box } from 'components';
import React from 'react'
import { Link } from 'react-router-dom';
import { Status } from 'types';

interface IGroupList {
    groupData: any;
    type?: Status;
  }

export const GroupList = ({ groupData, type } : IGroupList) => {
    if (type == Status.ACTIVE) {
        const activeGroups = groupData.filter((obj : any) => obj.teacherEdition.edition.active === true)
    
        return (
          <div className='w-full'>
            { activeGroups.map(function(group : any) {
              return <Link to={'/groups/' + group.id}>
                        <Box>
                            <span className='font-semibold text-xl'> {group.name} - {group.day} {group.hour} </span>
                            <span className='font-normal text-base'> 
                              {group.teacherEdition.edition.course.name} - {group.teacherEdition.edition.semester.year} { group.teacherEdition.edition.semester.winter ? "Zima" : "Lato"}
                            </span>
                        </Box>
                      </Link>
            }) }
          </div>
        )
      }
      else if (type == Status.INACTIVE) {
        const inactiveGroups = groupData.filter((obj : any) => obj.teacherEdition.edition.active === false)
    
        return (
          <div className='w-full h-full overflow-y-auto'>
            { inactiveGroups.map(function(group : any) {
              return <Link to={'/groups/' + group.id}>
                        <Box color='bg-red-500'>
                            <span className='font-semibold text-xl'> {group.name} - {group.day} {group.hour} </span>
                            <span className='font-normal text-base'> 
                              {group.teacherEdition.edition.course.name} - {group.teacherEdition.edition.semester.year} { group.teacherEdition.edition.semester.winter ? "Zima" : "Lato"}
                            </span>
                        </Box>
                      </Link>
            }) }
          </div>
        )
      }
    
      return (
        <div className='w-full h-full overflow-y-auto'>
        </div>
      )
}
