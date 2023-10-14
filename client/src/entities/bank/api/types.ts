import { BankDetails } from "../types/types"
export type ResAllBankDto = AllBankDto[]
export type ResBankDetails = BankDetails
export type ReqBankDetails = Id
type Id = number
// type CoordType = {
//     latitude: number,
//     longitude: number,
// }
export type ReqAllBanksDto = {
    latitude: number;
    longitude: number;
    raduis: number;
};
export type AllBankDto = {
    latitude: number,
    longitude: number,
    id: number
}
export type ResAllBankDto = AllBankDto[]
export type ResBankDetails = BankDetails
export type ReqBankDetails = Id