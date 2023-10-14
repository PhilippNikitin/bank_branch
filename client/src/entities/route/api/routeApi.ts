import axios from "axios"
import { useQuery } from "react-query"
import { baseApi } from "@/shared/api/baseApi"

type ResGetRoutes = {
    lat_start: number,
    lng_start: number,
    lat_end: number,
    lng_end: number,
}
export const useGetRoutes = (props: ResGetRoutes) => {
    const { lat_end, lat_start, lng_end, lng_start } = props

    const fetcher = async () => axios.get(`https://router.project-osrm.org/route/v1/driving/${lng_start},${lat_start};${lng_end},${lat_end}`)
    const queryResult = useQuery({
        queryFn: fetcher,
        queryKey: ['route'],
        enabled: true
    })
    return queryResult
}
// export const useGetBankDetailsById = () => {
//     const fetcher = async () => 
//     const queryResult = useQuery({
//         queryKey: ['bankDetail'],
//         queryFn: fetcher,
//     })
//         return queryResult
//     }