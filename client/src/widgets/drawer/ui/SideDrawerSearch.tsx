import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Icon,
  Input,
  ListItem,
  UnorderedList,
  useTheme
} from "@chakra-ui/react";
import { useState } from "react";
import { BankDetails } from "@/entities/bank/types/types";
import FilterIcon from "@/shared/assets/FilterIcon.svg?react";
import VtbLogoWhiteBlue from '@/shared/assets/VtbLogo.svg?react';
import { DropdownCombobox } from "./Combobox";

const bankDetails: BankDetails[] = [{
  id: 1,
  name: "Example Bank",
  address: "123 Main Street",
  latitude: "12.3456",
  longitude: "78.9101",
  work_schedule: {
    Monday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Tuesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Wednesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Thursday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Friday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Saturday: {
      start_time: "10:00 AM",
      end_time: "02:00 PM",
    },
    Sunday: {
      start_time: "Closed",
      end_time: "Closed",
    },
  },
  services: {
    card: {
      services: [true, true, true],
      employees: 5,
    },
    loan: {
      services: [true, true, false],
      employees: 3,
    },
    mortgage: {
      services: [true, false, false],
      employees: 2,
    },
    credit: {
      services: [true, true, true],
      employees: 4,
    },
    auto_loan: {
      services: [false, true, true],
      employees: 2,
    },
    deposit_and_accounts: {
      services: [true, true, true],
      employees: 6,
    },
    investment: {
      services: [true, true, true],
      employees: 4,
    },
    online: {
      services: [true, true, true],
      employees: 2,
    },
    biometric_data_collection: {
      services: [false, true, false],
      employees: 1,
    },
    cash_deposit_for_legal_entities: {
      services: [true, true, true],
      employees: 3,
    },
    agent_point_for_shares_placement_and_redemption: {
      services: [false, false, true],
      employees: 1,
    },
  },
}, {
  id: 2,
  name: "Example Bank 2",
  address: "321 Main Street",
  latitude: "12.3555",
  longitude: "78.9000",
  work_schedule: {
    Monday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Tuesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Wednesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Thursday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Friday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Saturday: {
      start_time: "10:00 AM",
      end_time: "02:00 PM",
    },
    Sunday: {
      start_time: "Closed",
      end_time: "Closed",
    },
  },
  services: {
    card: {
      services: [true, true, true],
      employees: 5,
    },
    loan: {
      services: [true, true, false],
      employees: 3,
    },
    mortgage: {
      services: [true, false, false],
      employees: 2,
    },
    credit: {
      services: [true, true, true],
      employees: 4,
    },
    auto_loan: {
      services: [false, true, true],
      employees: 2,
    },
    deposit_and_accounts: {
      services: [true, true, true],
      employees: 6,
    },
    investment: {
      services: [true, true, true],
      employees: 4,
    },
    online: {
      services: [true, true, true],
      employees: 2,
    },
    biometric_data_collection: {
      services: [false, true, false],
      employees: 1,
    },
    cash_deposit_for_legal_entities: {
      services: [true, true, true],
      employees: 3,
    },
    agent_point_for_shares_placement_and_redemption: {
      services: [false, false, true],
      employees: 1,
    },
  },
}, {
  id: 2,
  name: "Example Bank 2",
  address: "321 Main Street",
  latitude: "12.3555",
  longitude: "78.9000",
  work_schedule: {
    Monday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Tuesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Wednesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Thursday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Friday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Saturday: {
      start_time: "10:00 AM",
      end_time: "02:00 PM",
    },
    Sunday: {
      start_time: "Closed",
      end_time: "Closed",
    },
  },
  services: {
    card: {
      services: [true, true, true],
      employees: 5,
    },
    loan: {
      services: [true, true, false],
      employees: 3,
    },
    mortgage: {
      services: [true, false, false],
      employees: 2,
    },
    credit: {
      services: [true, true, true],
      employees: 4,
    },
    auto_loan: {
      services: [false, true, true],
      employees: 2,
    },
    deposit_and_accounts: {
      services: [true, true, true],
      employees: 6,
    },
    investment: {
      services: [true, true, true],
      employees: 4,
    },
    online: {
      services: [true, true, true],
      employees: 2,
    },
    biometric_data_collection: {
      services: [false, true, false],
      employees: 1,
    },
    cash_deposit_for_legal_entities: {
      services: [true, true, true],
      employees: 3,
    },
    agent_point_for_shares_placement_and_redemption: {
      services: [false, false, true],
      employees: 1,
    },
  },
}, {
  id: 2,
  name: "Example Bank 2",
  address: "321 Main Street",
  latitude: "12.3555",
  longitude: "78.9000",
  work_schedule: {
    Monday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Tuesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Wednesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Thursday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Friday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Saturday: {
      start_time: "10:00 AM",
      end_time: "02:00 PM",
    },
    Sunday: {
      start_time: "Closed",
      end_time: "Closed",
    },
  },
  services: {
    card: {
      services: [true, true, true],
      employees: 5,
    },
    loan: {
      services: [true, true, false],
      employees: 3,
    },
    mortgage: {
      services: [true, false, false],
      employees: 2,
    },
    credit: {
      services: [true, true, true],
      employees: 4,
    },
    auto_loan: {
      services: [false, true, true],
      employees: 2,
    },
    deposit_and_accounts: {
      services: [true, true, true],
      employees: 6,
    },
    investment: {
      services: [true, true, true],
      employees: 4,
    },
    online: {
      services: [true, true, true],
      employees: 2,
    },
    biometric_data_collection: {
      services: [false, true, false],
      employees: 1,
    },
    cash_deposit_for_legal_entities: {
      services: [true, true, true],
      employees: 3,
    },
    agent_point_for_shares_placement_and_redemption: {
      services: [false, false, true],
      employees: 1,
    },
  },
}, {
  id: 2,
  name: "Example Bank 2",
  address: "321 Main Street",
  latitude: "12.3555",
  longitude: "78.9000",
  work_schedule: {
    Monday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Tuesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Wednesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Thursday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Friday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Saturday: {
      start_time: "10:00 AM",
      end_time: "02:00 PM",
    },
    Sunday: {
      start_time: "Closed",
      end_time: "Closed",
    },
  },
  services: {
    card: {
      services: [true, true, true],
      employees: 5,
    },
    loan: {
      services: [true, true, false],
      employees: 3,
    },
    mortgage: {
      services: [true, false, false],
      employees: 2,
    },
    credit: {
      services: [true, true, true],
      employees: 4,
    },
    auto_loan: {
      services: [false, true, true],
      employees: 2,
    },
    deposit_and_accounts: {
      services: [true, true, true],
      employees: 6,
    },
    investment: {
      services: [true, true, true],
      employees: 4,
    },
    online: {
      services: [true, true, true],
      employees: 2,
    },
    biometric_data_collection: {
      services: [false, true, false],
      employees: 1,
    },
    cash_deposit_for_legal_entities: {
      services: [true, true, true],
      employees: 3,
    },
    agent_point_for_shares_placement_and_redemption: {
      services: [false, false, true],
      employees: 1,
    },
  },
}, {
  id: 2,
  name: "Example Bank 2",
  address: "321 Main Street",
  latitude: "12.3555",
  longitude: "78.9000",
  work_schedule: {
    Monday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Tuesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Wednesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Thursday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Friday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Saturday: {
      start_time: "10:00 AM",
      end_time: "02:00 PM",
    },
    Sunday: {
      start_time: "Closed",
      end_time: "Closed",
    },
  },
  services: {
    card: {
      services: [true, true, true],
      employees: 5,
    },
    loan: {
      services: [true, true, false],
      employees: 3,
    },
    mortgage: {
      services: [true, false, false],
      employees: 2,
    },
    credit: {
      services: [true, true, true],
      employees: 4,
    },
    auto_loan: {
      services: [false, true, true],
      employees: 2,
    },
    deposit_and_accounts: {
      services: [true, true, true],
      employees: 6,
    },
    investment: {
      services: [true, true, true],
      employees: 4,
    },
    online: {
      services: [true, true, true],
      employees: 2,
    },
    biometric_data_collection: {
      services: [false, true, false],
      employees: 1,
    },
    cash_deposit_for_legal_entities: {
      services: [true, true, true],
      employees: 3,
    },
    agent_point_for_shares_placement_and_redemption: {
      services: [false, false, true],
      employees: 1,
    },
  },
}, {
  id: 2,
  name: "Example Bank 2",
  address: "321 Main Street",
  latitude: "12.3555",
  longitude: "78.9000",
  work_schedule: {
    Monday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Tuesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Wednesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Thursday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Friday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Saturday: {
      start_time: "10:00 AM",
      end_time: "02:00 PM",
    },
    Sunday: {
      start_time: "Closed",
      end_time: "Closed",
    },
  },
  services: {
    card: {
      services: [true, true, true],
      employees: 5,
    },
    loan: {
      services: [true, true, false],
      employees: 3,
    },
    mortgage: {
      services: [true, false, false],
      employees: 2,
    },
    credit: {
      services: [true, true, true],
      employees: 4,
    },
    auto_loan: {
      services: [false, true, true],
      employees: 2,
    },
    deposit_and_accounts: {
      services: [true, true, true],
      employees: 6,
    },
    investment: {
      services: [true, true, true],
      employees: 4,
    },
    online: {
      services: [true, true, true],
      employees: 2,
    },
    biometric_data_collection: {
      services: [false, true, false],
      employees: 1,
    },
    cash_deposit_for_legal_entities: {
      services: [true, true, true],
      employees: 3,
    },
    agent_point_for_shares_placement_and_redemption: {
      services: [false, false, true],
      employees: 1,
    },
  },
}, {
  id: 2,
  name: "Example Bank 2",
  address: "321 Main Street",
  latitude: "12.3555",
  longitude: "78.9000",
  work_schedule: {
    Monday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Tuesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Wednesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Thursday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Friday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Saturday: {
      start_time: "10:00 AM",
      end_time: "02:00 PM",
    },
    Sunday: {
      start_time: "Closed",
      end_time: "Closed",
    },
  },
  services: {
    card: {
      services: [true, true, true],
      employees: 5,
    },
    loan: {
      services: [true, true, false],
      employees: 3,
    },
    mortgage: {
      services: [true, false, false],
      employees: 2,
    },
    credit: {
      services: [true, true, true],
      employees: 4,
    },
    auto_loan: {
      services: [false, true, true],
      employees: 2,
    },
    deposit_and_accounts: {
      services: [true, true, true],
      employees: 6,
    },
    investment: {
      services: [true, true, true],
      employees: 4,
    },
    online: {
      services: [true, true, true],
      employees: 2,
    },
    biometric_data_collection: {
      services: [false, true, false],
      employees: 1,
    },
    cash_deposit_for_legal_entities: {
      services: [true, true, true],
      employees: 3,
    },
    agent_point_for_shares_placement_and_redemption: {
      services: [false, false, true],
      employees: 1,
    },
  },
}, {
  id: 2,
  name: "Example Bank 2",
  address: "321 Main Street",
  latitude: "12.3555",
  longitude: "78.9000",
  work_schedule: {
    Monday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Tuesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Wednesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Thursday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Friday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Saturday: {
      start_time: "10:00 AM",
      end_time: "02:00 PM",
    },
    Sunday: {
      start_time: "Closed",
      end_time: "Closed",
    },
  },
  services: {
    card: {
      services: [true, true, true],
      employees: 5,
    },
    loan: {
      services: [true, true, false],
      employees: 3,
    },
    mortgage: {
      services: [true, false, false],
      employees: 2,
    },
    credit: {
      services: [true, true, true],
      employees: 4,
    },
    auto_loan: {
      services: [false, true, true],
      employees: 2,
    },
    deposit_and_accounts: {
      services: [true, true, true],
      employees: 6,
    },
    investment: {
      services: [true, true, true],
      employees: 4,
    },
    online: {
      services: [true, true, true],
      employees: 2,
    },
    biometric_data_collection: {
      services: [false, true, false],
      employees: 1,
    },
    cash_deposit_for_legal_entities: {
      services: [true, true, true],
      employees: 3,
    },
    agent_point_for_shares_placement_and_redemption: {
      services: [false, false, true],
      employees: 1,
    },
  },
}, {
  id: 2,
  name: "Example Bank 2",
  address: "321 Main Street",
  latitude: "12.3555",
  longitude: "78.9000",
  work_schedule: {
    Monday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Tuesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Wednesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Thursday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Friday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Saturday: {
      start_time: "10:00 AM",
      end_time: "02:00 PM",
    },
    Sunday: {
      start_time: "Closed",
      end_time: "Closed",
    },
  },
  services: {
    card: {
      services: [true, true, true],
      employees: 5,
    },
    loan: {
      services: [true, true, false],
      employees: 3,
    },
    mortgage: {
      services: [true, false, false],
      employees: 2,
    },
    credit: {
      services: [true, true, true],
      employees: 4,
    },
    auto_loan: {
      services: [false, true, true],
      employees: 2,
    },
    deposit_and_accounts: {
      services: [true, true, true],
      employees: 6,
    },
    investment: {
      services: [true, true, true],
      employees: 4,
    },
    online: {
      services: [true, true, true],
      employees: 2,
    },
    biometric_data_collection: {
      services: [false, true, false],
      employees: 1,
    },
    cash_deposit_for_legal_entities: {
      services: [true, true, true],
      employees: 3,
    },
    agent_point_for_shares_placement_and_redemption: {
      services: [false, false, true],
      employees: 1,
    },
  },
}, {
  id: 2,
  name: "Example Bank 2",
  address: "321 Main Street",
  latitude: "12.3555",
  longitude: "78.9000",
  work_schedule: {
    Monday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Tuesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Wednesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Thursday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Friday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Saturday: {
      start_time: "10:00 AM",
      end_time: "02:00 PM",
    },
    Sunday: {
      start_time: "Closed",
      end_time: "Closed",
    },
  },
  services: {
    card: {
      services: [true, true, true],
      employees: 5,
    },
    loan: {
      services: [true, true, false],
      employees: 3,
    },
    mortgage: {
      services: [true, false, false],
      employees: 2,
    },
    credit: {
      services: [true, true, true],
      employees: 4,
    },
    auto_loan: {
      services: [false, true, true],
      employees: 2,
    },
    deposit_and_accounts: {
      services: [true, true, true],
      employees: 6,
    },
    investment: {
      services: [true, true, true],
      employees: 4,
    },
    online: {
      services: [true, true, true],
      employees: 2,
    },
    biometric_data_collection: {
      services: [false, true, false],
      employees: 1,
    },
    cash_deposit_for_legal_entities: {
      services: [true, true, true],
      employees: 3,
    },
    agent_point_for_shares_placement_and_redemption: {
      services: [false, false, true],
      employees: 1,
    },
  },
}, {
  id: 2,
  name: "Example Bank 2",
  address: "321 Main Street",
  latitude: "12.3555",
  longitude: "78.9000",
  work_schedule: {
    Monday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Tuesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Wednesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Thursday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Friday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Saturday: {
      start_time: "10:00 AM",
      end_time: "02:00 PM",
    },
    Sunday: {
      start_time: "Closed",
      end_time: "Closed",
    },
  },
  services: {
    card: {
      services: [true, true, true],
      employees: 5,
    },
    loan: {
      services: [true, true, false],
      employees: 3,
    },
    mortgage: {
      services: [true, false, false],
      employees: 2,
    },
    credit: {
      services: [true, true, true],
      employees: 4,
    },
    auto_loan: {
      services: [false, true, true],
      employees: 2,
    },
    deposit_and_accounts: {
      services: [true, true, true],
      employees: 6,
    },
    investment: {
      services: [true, true, true],
      employees: 4,
    },
    online: {
      services: [true, true, true],
      employees: 2,
    },
    biometric_data_collection: {
      services: [false, true, false],
      employees: 1,
    },
    cash_deposit_for_legal_entities: {
      services: [true, true, true],
      employees: 3,
    },
    agent_point_for_shares_placement_and_redemption: {
      services: [false, false, true],
      employees: 1,
    },
  },
}, {
  id: 2,
  name: "Example Bank 2",
  address: "321 Main Street",
  latitude: "12.3555",
  longitude: "78.9000",
  work_schedule: {
    Monday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Tuesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Wednesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Thursday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Friday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Saturday: {
      start_time: "10:00 AM",
      end_time: "02:00 PM",
    },
    Sunday: {
      start_time: "Closed",
      end_time: "Closed",
    },
  },
  services: {
    card: {
      services: [true, true, true],
      employees: 5,
    },
    loan: {
      services: [true, true, false],
      employees: 3,
    },
    mortgage: {
      services: [true, false, false],
      employees: 2,
    },
    credit: {
      services: [true, true, true],
      employees: 4,
    },
    auto_loan: {
      services: [false, true, true],
      employees: 2,
    },
    deposit_and_accounts: {
      services: [true, true, true],
      employees: 6,
    },
    investment: {
      services: [true, true, true],
      employees: 4,
    },
    online: {
      services: [true, true, true],
      employees: 2,
    },
    biometric_data_collection: {
      services: [false, true, false],
      employees: 1,
    },
    cash_deposit_for_legal_entities: {
      services: [true, true, true],
      employees: 3,
    },
    agent_point_for_shares_placement_and_redemption: {
      services: [false, false, true],
      employees: 1,
    },
  },
}, {
  id: 2,
  name: "Example Bank 2",
  address: "321 Main Street",
  latitude: "12.3555",
  longitude: "78.9000",
  work_schedule: {
    Monday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Tuesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Wednesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Thursday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Friday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Saturday: {
      start_time: "10:00 AM",
      end_time: "02:00 PM",
    },
    Sunday: {
      start_time: "Closed",
      end_time: "Closed",
    },
  },
  services: {
    card: {
      services: [true, true, true],
      employees: 5,
    },
    loan: {
      services: [true, true, false],
      employees: 3,
    },
    mortgage: {
      services: [true, false, false],
      employees: 2,
    },
    credit: {
      services: [true, true, true],
      employees: 4,
    },
    auto_loan: {
      services: [false, true, true],
      employees: 2,
    },
    deposit_and_accounts: {
      services: [true, true, true],
      employees: 6,
    },
    investment: {
      services: [true, true, true],
      employees: 4,
    },
    online: {
      services: [true, true, true],
      employees: 2,
    },
    biometric_data_collection: {
      services: [false, true, false],
      employees: 1,
    },
    cash_deposit_for_legal_entities: {
      services: [true, true, true],
      employees: 3,
    },
    agent_point_for_shares_placement_and_redemption: {
      services: [false, false, true],
      employees: 1,
    },
  },
}, {
  id: 2,
  name: "Example Bank 2",
  address: "321 Main Street",
  latitude: "12.3555",
  longitude: "78.9000",
  work_schedule: {
    Monday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Tuesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Wednesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Thursday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Friday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Saturday: {
      start_time: "10:00 AM",
      end_time: "02:00 PM",
    },
    Sunday: {
      start_time: "Closed",
      end_time: "Closed",
    },
  },
  services: {
    card: {
      services: [true, true, true],
      employees: 5,
    },
    loan: {
      services: [true, true, false],
      employees: 3,
    },
    mortgage: {
      services: [true, false, false],
      employees: 2,
    },
    credit: {
      services: [true, true, true],
      employees: 4,
    },
    auto_loan: {
      services: [false, true, true],
      employees: 2,
    },
    deposit_and_accounts: {
      services: [true, true, true],
      employees: 6,
    },
    investment: {
      services: [true, true, true],
      employees: 4,
    },
    online: {
      services: [true, true, true],
      employees: 2,
    },
    biometric_data_collection: {
      services: [false, true, false],
      employees: 1,
    },
    cash_deposit_for_legal_entities: {
      services: [true, true, true],
      employees: 3,
    },
    agent_point_for_shares_placement_and_redemption: {
      services: [false, false, true],
      employees: 1,
    },
  },
}, {
  id: 2,
  name: "Example Bank 2",
  address: "321 Main Street",
  latitude: "12.3555",
  longitude: "78.9000",
  work_schedule: {
    Monday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Tuesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Wednesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Thursday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Friday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Saturday: {
      start_time: "10:00 AM",
      end_time: "02:00 PM",
    },
    Sunday: {
      start_time: "Closed",
      end_time: "Closed",
    },
  },
  services: {
    card: {
      services: [true, true, true],
      employees: 5,
    },
    loan: {
      services: [true, true, false],
      employees: 3,
    },
    mortgage: {
      services: [true, false, false],
      employees: 2,
    },
    credit: {
      services: [true, true, true],
      employees: 4,
    },
    auto_loan: {
      services: [false, true, true],
      employees: 2,
    },
    deposit_and_accounts: {
      services: [true, true, true],
      employees: 6,
    },
    investment: {
      services: [true, true, true],
      employees: 4,
    },
    online: {
      services: [true, true, true],
      employees: 2,
    },
    biometric_data_collection: {
      services: [false, true, false],
      employees: 1,
    },
    cash_deposit_for_legal_entities: {
      services: [true, true, true],
      employees: 3,
    },
    agent_point_for_shares_placement_and_redemption: {
      services: [false, false, true],
      employees: 1,
    },
  },
}, {
  id: 2,
  name: "Example Bank 2",
  address: "321 Main Street",
  latitude: "12.3555",
  longitude: "78.9000",
  work_schedule: {
    Monday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Tuesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Wednesday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Thursday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Friday: {
      start_time: "09:00 AM",
      end_time: "05:00 PM",
    },
    Saturday: {
      start_time: "10:00 AM",
      end_time: "02:00 PM",
    },
    Sunday: {
      start_time: "Closed",
      end_time: "Closed",
    },
  },
  services: {
    card: {
      services: [true, true, true],
      employees: 5,
    },
    loan: {
      services: [true, true, false],
      employees: 3,
    },
    mortgage: {
      services: [true, false, false],
      employees: 2,
    },
    credit: {
      services: [true, true, true],
      employees: 4,
    },
    auto_loan: {
      services: [false, true, true],
      employees: 2,
    },
    deposit_and_accounts: {
      services: [true, true, true],
      employees: 6,
    },
    investment: {
      services: [true, true, true],
      employees: 4,
    },
    online: {
      services: [true, true, true],
      employees: 2,
    },
    biometric_data_collection: {
      services: [false, true, false],
      employees: 1,
    },
    cash_deposit_for_legal_entities: {
      services: [true, true, true],
      employees: 3,
    },
    agent_point_for_shares_placement_and_redemption: {
      services: [false, false, true],
      employees: 1,
    },
  },
}];

// const mock = [{ id: 1, time: 12, address: 'Москва Отделение 1', workload: 0, dist: 20 }, { id: 2, time: 10, address: 'Москва Отделение 2', workload: 2, dist: 15 }, { id: 3, time: 14, address: 'Москва Отделение 3', workload: 5, dist: 10 }]

export default function SideDrawerSearch({ value, onInput, toggleFilter, toggleMap }) {
  const theme = useTheme();
  const [selectedBranch, setSelectedBranch] = useState('');

  const initValues = bankDetails.map(el => (el.address))

  function handleBranchSelection(branch) {
    setSelectedBranch(branch);
  }

  return (
    <Box display={"flex"} gap={"16px"} flexDir={"column"} height={"100%"} >
      <Box display={"flex"} alignContent={"center"} gap={"8px"}>
        <DropdownCombobox
          initialState={initValues}
        // options={{ label: 'Откуда', }}
        // onChange={handleSelectedCityChange}
        // selectedItem={selectedCity}
        />
        <Button onClick={toggleFilter} type="button" variant={"secondary"} minWidth={"40px"} height={"32px"} bgColor={theme.colors.grey.vtb_hardgrey}
        ><Icon width={"24px"} height={"24px"} viewBox='3 3 20 20'>
            <FilterIcon />
          </Icon>
        </Button>
      </Box>
      <ButtonGroup spacing={"8px"}>
        <Button
          border={"1px solid"}
          borderColor={theme.colors.blue.vtb_primary}
          type="button"
          variant={'base'}
          isActive={selectedBranch === 'banks'}
          onClick={() => handleBranchSelection('banks')}
        >Отделения</Button>
        <Button
          border={"1px solid"}
          borderColor={theme.colors.blue.vtb_primary}
          type="button"
          variant={'base'}
          borderRadius={"32px"}
          isActive={selectedBranch === 'atms'}
          onClick={() => handleBranchSelection('atms')}
        >Банкоматы</Button>
      </ButtonGroup>
      <UnorderedList marginLeft={0} flexGrow={1} spacing={4}>
        {bankDetails && bankDetails.length ? bankDetails.map(b => {
          return (
            <ListItem listStyleType={"none"} key={b.id} _hover={{ bgColor: theme.colors.grey.vtb_hardgrey }}>
              <Flex alignItems="center" width="100%">
                <Icon fill={"white"} bgColor={"#00A5FF"} width={10} height={10} borderRadius={90}>
                  <VtbLogoWhiteBlue fill="white" aria-hidden="true" viewBox="26 -8 30 30" filter="invert(100%) sepia(100%) saturate(0%) hue-rotate(201deg) brightness(200%) contrast(106%)" />
                </Icon>
                <Button
                  _hover={{ bgColor: "none" }}
                  _active={{ bgColor: "none" }}
                  color={"white"}
                  bgColor={"transparent"}
                  title={b.address}
                  type="button"
                  justifyContent="flex-start"
                  alignItems="center"
                  onClick={toggleMap}
                >{b.address}
                </Button>
              </Flex>
            </ListItem>
          )
        }
        ) : []}
      </UnorderedList>
      <Box >
        <Button width={"100%"} alignSelf="flex-end" variant={"secondary"} bgColor={theme.colors.blue.vtb_primary} >Подобрать отделение</Button>
      </Box>
    </Box >
  )
}

