import { Box } from "components";
import { Spinner } from "components/Spinner";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { Status } from "types";
import { getEditions } from "../api/getEditions";

interface IEditionList {
  editionData: any;
  type: Status;
}

export const EditionList = ({editionData, type} : IEditionList) => {
  const { id } = useParams()
  const editionsQuery = useQuery(['editions', id], () => getEditions( id ))

  console.log(editionsQuery.data)
  
  if (editionsQuery.isLoading) {
    return (
      <Spinner />
    );
  }
  else if (editionsQuery.isError) {
    return (
      <div>
        Error!
      </div>
    );
  }
  else {
    if (type == Status.ACTIVE) {
      const activeEditions = editionsQuery.data.filter((obj : any) => obj.active === true)

      return (
        <div className='w-full'>
          { activeEditions.map(function(edition : any) {
            return <Link key={ edition.id} to= {'/editions/' + edition.id}>
                      <Box>
                        <span className='text-lg font-semibold'>
                          { edition.course.name + " " + edition.semester.year + " - "}
                          { edition.semester.winter ? "Zima" : "Lato"}
                        </span>
                        <div className="flex flex-row pt-1">
                          { edition.teachers.map((teacher: any) => {
                            return (
                              <span className="text-base font-normal text-blue-800 mr-4"> { teacher.first_name + " " + teacher.last_name}</span>
                            )
                          }) } 
                        </div>
                      </Box>
                    </Link>
          }) }
        </div>
      )
    }
    else if (type == Status.INACTIVE) {
      const closedEditions = editionsQuery.data.filter((obj : any) => obj.active === false)

      return (
        <div className='w-full h-full overflow-y-auto'>
          { closedEditions.map(function(edition : any) {
            return <Link key={ edition.id} to= {'/editions/' + edition.id}>
                      <Box color='bg-red-500'>
                        <span className='text-lg font-semibold'>
                          { edition.course.name + " " + edition.semester.year + " - "}
                          { edition.semester.winter ? "Zima" : "Lato"}
                        </span>
                        <div className="flex flex-row pt-2">
                          { edition.teachers.map((teacher: any) => {
                            return (
                              <span className="text-base font-normal text-blue-800 mr-4"> { teacher.first_name + " " + teacher.last_name } </span>
                            )
                          }) } 
                        </div>
                      </Box>
                    </Link>
          }) }
        </div>
      )
    }
  }

  return (
    <div className='w-full h-full overflow-y-auto'>
    </div>
  )
}
