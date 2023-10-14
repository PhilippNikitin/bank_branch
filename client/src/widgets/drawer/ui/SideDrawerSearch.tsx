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
  "id": 179,
  "name": "Операционный офис «Исторический»",
  "address": "г. Красноярск, просп. Мира, д. 100",
  "latitude": "56.0115864",
  "longitude": "92.8591416",
  "work_schedule": {
    "Monday": {
      "start_time": "09:00",
      "end_time": "18:00"
    },
    "Tuesday": {
      "start_time": "09:00",
      "end_time": "18:00"
    },
    "Wednesday": {
      "start_time": "09:00",
      "end_time": "18:00"
    },
    "Thursday": {
      "start_time": "09:00",
      "end_time": "18:00"
    },
    "Friday": {
      "start_time": "09:00",
      "end_time": "18:00"
    },
    "Saturday": {
      "start_time": "09:00",
      "end_time": "15:00"
    },
    "Sunday": {
      "start_time": "Closed",
      "end_time": "Closed"
    }
  },
  "services": {
    "card": {
      "services": [
        true
      ],
      "employees": 3
    },
    "loan": {
      "services": [
        true
      ],
      "employees": 2
    },
    "mortgage": {
      "services": [
        true
      ],
      "employees": 6
    },
    "credit": {
      "services": [
        false
      ],
      "employees": 6
    },
    "auto_loan": {
      "services": [
        true
      ],
      "employees": 3
    },
    "deposit_and_accounts": {
      "services": [
        true
      ],
      "employees": 1
    },
    "investment": {
      "services": [
        false
      ],
      "employees": 3
    },
    "online": {
      "services": [
        true
      ],
      "employees": 2
    },
    "biometric_data_collection": {
      "services": [
        false
      ],
      "employees": 6
    },
    "cash_deposit_for_legal_entities": {
      "services": [
        true
      ],
      "employees": 6
    },
    "agent_point_for_shares_placement_and_redemption": {
      "services": [
        false
      ],
      "employees": 2
    }
  },
  "queue": {
    "card": {
      "minutes": [
        5
      ],
      "people": 4
    },
    "loan": {
      "minutes": [
        15
      ],
      "people": 5
    },
    "mortgage": {
      "minutes": [
        5
      ],
      "people": 3
    },
    "credit": {
      "minutes": [
        20
      ],
      "people": 4
    },
    "auto_loan": {
      "minutes": [
        5
      ],
      "people": 3
    },
    "deposit_and_accounts": {
      "minutes": [
        5
      ],
      "people": 6
    },
    "investment": {
      "minutes": [
        5
      ],
      "people": 3
    },
    "online": {
      "minutes": [
        5
      ],
      "people": 5
    },
    "biometric_data_collection": {
      "minutes": [
        10
      ],
      "people": 6
    },
    "cash_deposit_for_legal_entities": {
      "minutes": [
        10
      ],
      "people": 5
    },
    "agent_point_for_shares_placement_and_redemption": {
      "minutes": [
        15
      ],
      "people": 2
    }
  }
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
            <ListItem listStyleType={"none"} key={b.id + b.name} _hover={{ bgColor: theme.colors.grey.vtb_hardgrey }}>
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

