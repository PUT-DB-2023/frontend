import { Box } from 'components';
import { Group } from 'features/groups/types';
import { Link } from 'react-router-dom';

interface IStudentGroupList {
  groupData: Group[];
}

export const StudentGroupList = ({ groupData }: IStudentGroupList) => {
  if (groupData !== undefined) {
    return (
      <div className='w-full h-full'>
        {groupData.length == 0 ?
          <div className='w-full h-full flex justify-center items-center p-10 font-semibold text-xl'> Brak Grup </div> :
          groupData.map((group: Group) => {
            return (
              <Link key={group?.id} to={'/groups/' + group?.id}>
                <Box>
                  <span className='font-semibold text-xl'>{group?.name}</span>
                  <div className='flex flex-col'>
                    <span className='font-modeium text-base'>{group.day} {group.hour}</span>
                    <span className='font-medium text-base text-blue-800'> {group.teacherEdition.teacher.user.first_name + " " + group.teacherEdition.teacher.user.last_name}</span>
                  </div>
                </Box>
              </Link>
            )
          })
        }
      </div>
    )
  }

  return <></>
}