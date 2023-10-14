import { BankDetails } from "../types/types";
export type ResAllBankDto = AllBankDto[];
export type ResBankDetails = BankDetails;
export type ReqBankDetails = Id;
type Id = number;
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
  latitude: number;
  longitude: number;
  id: number;
};
type Service = {
  card: boolean;
  loan: boolean;
  mortgage: boolean;
  credit: boolean;
  auto_loan: boolean;
  deposit_and_accounts: boolean;
  investment: boolean;
  online: boolean;
  biometric_data_collection: boolean;
  cash_deposit_for_legal_entities: boolean;
  agent_point_for_shares_placement_and_redemption: boolean;
};
export type ResGetCorrectBank = {
  latitude: number;
  longitude: number;
  service: Service[];
};
export type ReqGetCorrectBank = {};
