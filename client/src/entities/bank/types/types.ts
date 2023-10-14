type WorkSchedule = {
    Monday: {
        start_time: string;
        end_time: string;
    };
    Tuesday: {
        start_time: string;
        end_time: string;
    };
    Wednesday: {
        start_time: string;
        end_time: string;
    };
    Thursday: {
        start_time: string;
        end_time: string;
    };
    Friday: {
        start_time: string;
        end_time: string;
    };
    Saturday: {
        start_time: string;
        end_time: string;
    };
    Sunday: {
        start_time: string;
        end_time: string;
    };
};

type Service = {
    services: boolean[];
    employees: number;
};

export type BankDetails = {
    id: number;
    name: string;
    address: string;
    latitude: string;
    longitude: string;
    work_schedule: WorkSchedule;
    services: {
        card: Service;
        loan: Service;
        mortgage: Service;
        credit: Service;
        auto_loan: Service;
        deposit_and_accounts: Service;
        investment: Service;
        online: Service;
        biometric_data_collection: Service;
        cash_deposit_for_legal_entities: Service;
        agent_point_for_shares_placement_and_redemption: Service;
    };
};