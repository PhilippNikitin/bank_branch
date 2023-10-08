import { useQuery } from "react-query"
import { baseApi } from "@/shared/api/baseApi"

export const useGetBankDetails = (id: number) => {
    const fetcher = async () => (await baseApi.get(`/bank/${id}`)).data
    const queryResult = useQuery(['bank'], fetcher)
    return queryResult

}