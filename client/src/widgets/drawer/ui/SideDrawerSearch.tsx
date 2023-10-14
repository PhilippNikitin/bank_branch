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
import FilterIcon from "@/shared/assets/FilterIcon.svg?react";
import VtbLogoWhiteBlue from '@/shared/assets/VtbLogo.svg?react';


const mock = [{ id: 1, time: 12, address: 'Москва Отделение 1', workload: 0, dist: 20 }, { id: 2, time: 10, address: 'Москва Отделение 2', workload: 2, dist: 15 }, { id: 3, time: 14, address: 'Москва Отделение 3', workload: 5, dist: 10 }]

export default function SideDrawerSearch({ value, onInput }) {
  const theme = useTheme();
  const [selectedBranch, setSelectedBranch] = useState('');

  function handleBranchSelection(branch) {
    setSelectedBranch(branch);
  }

  return (
    <Box display={"flex"} gap={"16px"} flexDir={"column"} height={"100%"} >
      <Box display={"flex"} alignContent={"center"} gap={"8px"}>
        <Input
          height={"32px"}
          type={"search"}
          color={"white"}
          border={"none"}
          value={value}
          placeholder={"Город, район, улица, м... "}
          onChange={onInput}
          bgColor={theme.colors.grey.vtb_hardgrey}
        />
        <Button type="button" variant={"secondary"} minWidth={"40px"} height={"32px"} bgColor={theme.colors.grey.vtb_hardgrey}
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
        {mock && mock.length ? mock.map(b => {
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

