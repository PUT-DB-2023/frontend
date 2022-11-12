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
        const activeGroups = groupData.filter((obj : any) => obj?.teacherEdition?.edition?.active === true)
        return (
          <div className='w-full'>
            { activeGroups.length == 0 ? 
            <div className='w-full h-full flex justify-center items-center p-10 font-semibold text-xl'> Brak Wyników </div> :
            activeGroups.map(function(group : any) {
              return <Link to={'/groups/' + group.id}>
                        <Box>
                            <span className='font-semibold text-xl'> {group.name} - {group.teacherEdition.edition.course.name} - {group.teacherEdition.edition.semester.year} { group.teacherEdition.edition.semester.winter ? "Zima" : "Lato"}</span>
                            <span className='font-normal text-base'> 
                              {group.day} {group.hour} 
                            </span>
                        </Box>
                      </Link>
            }) }
          </div>
        )
      }
      else if (type == Status.INACTIVE) {
        const inactiveGroups = groupData.filter((obj : any) => obj?.teacherEdition?.edition?.active === false)
    
        return (
          <div className='w-full'>
            { inactiveGroups.length == 0 ? 
            <div className='w-full h-full flex justify-center items-center p-10 font-semibold text-xl'> Brak Wyników </div> :
            inactiveGroups.map(function(group : any) {
              return <Link to={'/groups/' + group.id}>
                        <Box>
                            <span className='font-semibold text-xl'> {group.name} - {group.teacherEdition.edition.course.name} - {group.teacherEdition.edition.semester.year} { group.teacherEdition.edition.semester.winter ? "Zima" : "Lato"}</span>
                            <span className='font-normal text-base'> 
                              {group.day} {group.hour} 
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
