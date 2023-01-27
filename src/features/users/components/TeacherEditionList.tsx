import { Box } from 'components';
import { Edition } from 'features/editions';
import { Link } from 'react-router-dom';

interface ITeacherEditionList {
  editionData: Edition[];
}

export const TeacherEditionList = ({ editionData }: ITeacherEditionList) => {
  if (editionData !== undefined) {
    return (
      <div className='w-full h-full'>
        {editionData.length == 0 ?
          <div className='w-full h-full flex justify-center items-center p-10 font-semibold text-xl'> Brak Edycji </div> :
          editionData.map((edition: Edition) => {
            return (
              <Link key={edition?.id} to={'/courses/' + edition?.course?.id + '/editions/' + edition?.id}>
                <Box color={!edition.semester.active ? 'bg-red-500' : 'bg-blue-700'}>
                  <span className='font-semibold text-xl'>
                    {edition.course.name}
                  </span>
                  <span className='font-normal text-lg'>
                    {edition.semester.start_year.toString().concat('/').concat((edition.semester.start_year + 1).toString()).concat(edition.semester.winter ? " - Zima" : " - Lato")}
                  </span>
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