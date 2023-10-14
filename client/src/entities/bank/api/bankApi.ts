import { useQuery } from "react-query"
import { baseApi } from "@/shared/api/baseApi"
import { ReqBankDetails, ReqAllBanksDto, ResBankDetails, ResAllBankDto } from "./types"

export const useGetAllBanks = ({ latitude, longitude, raduis }: ReqAllBanksDto) => {


    const fetcher = async () => (await baseApi.get<ResAllBankDto>(`/get-all-banks/?latitude=${latitude}&longitude=${longitude}&radius=${raduis}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })).data
    const queryResult = useQuery({
        queryFn: fetcher,
        queryKey: ['banks'],
        enabled: true
    })
    return queryResult
}
export const useGetBankDetailsById = (id: ReqBankDetails) => {
    const fetcher = async () => (await baseApi.get<ResBankDetails>(`/get-bank/?format=json&id=${id}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })).data
    const queryResult = useQuery({
        queryKey: ['bankDetail'],
        queryFn: fetcher,
    })
    return queryResult
}
export const useGetCorrectBank = () => {
    const fetcher = async () => (await baseApi.get('/get-bank/', {
        headers: {
            'Content-Type': 'application/json',
        }
    })).data
    const queryResult = useQuery({
        queryKey: ['CorrectBank'],
        queryFn: fetcher,
    })
    return queryResult
}