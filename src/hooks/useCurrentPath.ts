import { matchRoutes, useLocation } from "react-router-dom"

const routes = [{ path: "/members/:id" }]

export const useCurrentPath = () => {
  const location = useLocation()
  const [{ route }] : any = matchRoutes(routes, location)

  return route.path
}