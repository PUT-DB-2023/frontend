import { Box } from 'components'
import { Spinner } from 'components/Spinner'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { Status } from 'types'
import { getSemesters } from '../api/getSemesters'
import { Semester } from '../types'

interface ISemesterList {
  semesterData: any;
  type: Status;
}

export const SemesterList = ({ semesterData, type } : ISemesterList) => {

  if (type == Status.ACTIVE) {
    const activeSemesters = semesterData.filter((obj : any) => obj.active === true)

    return (
      <div className='w-full'>
        { activeSemesters.map(function(semester : any) {
          return <Link to={'/semesters/' + semester.id}>
                    <Box>
                        <span className='font-semibold text-xl'> { semester.name } </span>
                    </Box>
                  </Link>
        }) }
      </div>
    )
  }
  else if (type == Status.INACTIVE) {
    const inactiveSemesters = semesterData.filter((obj : any) => obj.active === false)

    return (
      <div className='w-full h-full overflow-y-auto'>
        { inactiveSemesters.map(function(semester : any) {
          return <Link to={'/semesters/' + semester.id}>
                    <Box color='bg-red-500'>
                        <span className='font-semibold text-xl'> { semester.name } </span>
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