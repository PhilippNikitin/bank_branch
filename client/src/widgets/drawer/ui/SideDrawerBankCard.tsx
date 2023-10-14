import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Switch,
  Text,
  VStack,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Flex,
  ListItem,
  UnorderedList,
  Link
} from '@chakra-ui/react';
import { useState } from 'react';
import { theme } from '../../../app/styles/global';

const hours = ["8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
const workload = [0.5, 0.8, 0.6, 0.9, 0.3, 0.7, 0.4, 0.8, 0.2, 0.6, 0.9, 0.5, 0.4];

const mockBank = [{
  id: 136, name: "Дополнительный офис \"Ярославский\"", address: "г. Москва, пл. Комсомольская, д. 5", latiitude: "55.7756256", longitude: "37.655244", work_schedule: {
    "Monday": {
      "start_time": "09:00",
      "end_time": "18:00",
    }, "Tuesday": {
      "start_time": "09:00",
      "end_time": "18:00",
    }, "Wednesday": {
      "start_time": "09:00",
      "end_time": "18:00",
    }, "Thursday": {
      "start_time": "09:00",
      "end_time": "18:00",
    }, "Friday": {
      "start_time": "09:00",
      "end_time": "18:00",
    }, "Saturday": {
      "start_time": "09:00",
      "end_time": "18:00",
    }, "Sunday": {
      "start_time": "09:00",
      "end_time": "18:00",
    },
  }
}]

export const SideDrawerBankCard = ({ toggleMap }) => {
  const [isWorkingTimeOn, setIsWorkingTimeOn] = useState(false);
  const [isAccessibilityOn, setIsAccessibilityOn] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDay, setSelectedDay] = useState('Monday');

  const handleWorkingTimeToggle = () => {
    setIsWorkingTimeOn(!isWorkingTimeOn);
  };

  const handleAccessibilityToggle = () => {
    setIsAccessibilityOn(!isAccessibilityOn);
  };

  const handleServiceSelection = (service) => {
    const updatedServices = [...selectedServices];
    const serviceIndex = updatedServices.indexOf(service);

    if (serviceIndex === -1) {
      updatedServices.push(service);
    } else {
      updatedServices.splice(serviceIndex, 1);
    }

    setSelectedServices(updatedServices);
  };

  const handleDaySelection = (day) => {
    setSelectedDay(day);
  };

  const handleCreateRouteClick = () => {
    // Handle "Create a Route" button click
  };

  return (
    <VStack spacing={4} align="stretch">
      <Flex>
        <Heading size={'sm'} as="h2">
          {mockBank[0].name}
        </Heading>
        <Button bgColor={"transparent"} color={"white"} onClick={toggleMap} cursor={'pointer'}>x</Button>
      </Flex>

      <Text>{mockBank[0].address}</Text>
      <Text >Possible Metro Station</Text>
      <Text>Open Till Time</Text>

      <Button variant={'secondary'} bgColor={theme.colors.blue.vtb_primary} onClick={handleCreateRouteClick}>
        Проложить маршрут
      </Button>

      <Divider />

      <HStack spacing={"11px"}>
        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
          <Button
            borderRadius={"8px"}
            bgColor={"black"}
            color={"white"}
            height={"28px"}
            key={day}
            isActive={selectedDay === day}
            onClick={() => handleDaySelection(day)}
          >
            {day}
          </Button>
        ))}
      </HStack>

      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <AccordionButton>
            Загруженность офиса
          </AccordionButton>
          <AccordionPanel>
            <Box display="flex" alignItems="flex-end" height="100px">
              {hours.map((hour, index) => (
                <Box
                  key={hour}
                  width="20px"
                  height={`${workload[index] * 50}%`}
                  bg="blue.500"
                  marginLeft="10px"
                  borderRadius={"4px"}
                ></Box>
              ))}
            </Box>
            <Box display="flex" width="100%" justifyContent="space-between">
              {hours.map((hour) => (
                <Text key={hour} fontSize="12px">
                  {hour}
                </Text>
              ))}
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Flex flexDir={"column"} >
        {["Фические лица", "Зона пемиального обслуживания", "Прайм", "Юридичсекие лица"].map((client) => (
          <Box
            key={client}
          >
            {client}
          </Box>
        ))}
      </Flex>
      <Divider />
      <Flex flexDir={"column"} gap={3}>
        <Heading size={'md'}>Доступная среда</Heading>
        <Flex>
          <Box>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_60_1385)">
                <path d="M14.9735 6.67058C16.8155 6.67058 18.3088 5.17732 18.3088 3.33529C18.3088 1.49326 16.8155 0 14.9735 0C13.1314 0 11.6382 1.49326 11.6382 3.33529C11.6382 5.17732 13.1314 6.67058 14.9735 6.67058Z" fill="#4789EB" />
                <path d="M28.4697 30.6416C27.8263 30.335 27.056 30.6054 26.7481 31.2495C24.9566 34.9967 21.1154 37.4169 16.9643 37.4169C10.9881 37.4169 6.12509 32.5552 6.12509 26.5783C6.12509 23.1853 7.67029 20.0507 10.3648 17.9794C10.9304 17.5447 11.0364 16.7342 10.6023 16.1692C10.1669 15.6029 9.35705 15.4983 8.79211 15.9317C5.45749 18.4961 3.54395 22.3769 3.54395 26.5783C3.54395 33.9782 9.56438 40 16.9649 40C22.1038 40 26.8594 37.0015 29.0776 32.3639C29.3842 31.7192 29.1118 30.9496 28.4697 30.6416Z" fill="#4789EB" />
                <path d="M36.2432 31.638L29.2895 20.4821C28.9573 19.9487 28.2998 19.8232 27.6 19.8487H18.8461C18.4905 19.8487 18.2027 19.8111 18.2047 19.7662L18.2094 19.6837V18.2626C18.2094 17.9063 18.2664 17.6279 18.3382 17.6353C18.3812 17.6399 18.4255 17.6433 18.4691 17.6433H26.1078C26.9687 17.6433 27.6671 16.9448 27.6671 16.0833C27.6671 15.2225 26.9687 14.5241 26.1078 14.5241H18.4691C18.4255 14.5241 18.3812 14.5267 18.3382 14.5314C18.2664 14.5402 18.2094 14.2617 18.2094 13.9048V10.2568C18.2094 8.86996 17.0849 7.74612 15.6987 7.74612H15.0016C13.6141 7.74612 12.4902 8.86996 12.4902 10.2568V20.0077V22.8781C12.4902 24.2642 13.6141 25.3887 15.0016 25.3887H15.6987H16.9105H27.019C27.3753 25.3887 27.8228 25.6296 28.0194 25.9275C29.2284 27.7545 33.0978 33.5992 33.0978 33.5992C33.5641 34.3486 34.649 34.519 35.5179 33.9776C36.3854 33.4361 36.7095 32.3888 36.2432 31.638Z" fill="#4789EB" />
              </g>
              <defs>
                <clipPath id="clip0_60_1385">
                  <rect width="40" height="40" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Box>
          <Text>Доступ для маломобильных граждан</Text>
        </Flex>
      </Flex>

      <Divider />
      <Flex flexDir={"column"} gap={2}>
        <Box>Режим работы отделения</Box>
        <Box>
          {mockBank[0].work_schedule.Monday.start_time} - {mockBank[0].work_schedule.Monday.end_time}
        </Box>
      </Flex>
      <Divider />

      <Heading size={"md"}>Услуги</Heading>
      <UnorderedList spacing={2}>
        {[
          "кредиты",
          "карты",
          "ипотека",
          "автокредиты",
          "вклады",
          "накопления",
          "страхование",
          "пенсия",
          "валюта",
          "remittance",
          "investments",
          "mobile-banking",
        ].map((service) => (
          <ListItem listStyleType={"none"}
            key={service}
          >
            {service}
          </ListItem>
        ))}
      </UnorderedList>
      <Link color={theme.colors.blue.vtb_primary}>Больше услуг</Link>
      <Divider />
      <Flex justifyContent={"space-between"} alignItems={'center'} paddingBottom={"20px"}>
        <FormLabel cursor={"pointer"}>Поделиться информацией</FormLabel>
        <Button bgColor={"transparent"} padding={0}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.924 3.617C20.8741 3.49665 20.801 3.38725 20.709 3.295L20.705 3.291C20.5179 3.1044 20.2643 2.99973 20 3H14C13.7348 3 13.4804 3.10536 13.2929 3.29289C13.1054 3.48043 13 3.73478 13 4C13 4.26522 13.1054 4.51957 13.2929 4.70711C13.4804 4.89464 13.7348 5 14 5H17.586L10.293 12.293C10.1975 12.3852 10.1213 12.4956 10.0689 12.6176C10.0165 12.7396 9.9889 12.8708 9.98775 13.0036C9.9866 13.1364 10.0119 13.2681 10.0622 13.391C10.1125 13.5139 10.1867 13.6255 10.2806 13.7194C10.3745 13.8133 10.4861 13.8875 10.609 13.9378C10.7319 13.9881 10.8636 14.0134 10.9964 14.0123C11.1292 14.0111 11.2604 13.9835 11.3824 13.9311C11.5044 13.8787 11.6148 13.8025 11.707 13.707L19 6.414V10C19 10.2652 19.1054 10.5196 19.2929 10.7071C19.4804 10.8946 19.7348 11 20 11C20.2652 11 20.5196 10.8946 20.7071 10.7071C20.8946 10.5196 21 10.2652 21 10V3.997C20.9997 3.86659 20.9739 3.73749 20.924 3.617ZM3 8C3 6.67392 3.52678 5.40215 4.46447 4.46447C5.40215 3.52678 6.67392 3 8 3H9C9.26522 3 9.51957 3.10536 9.70711 3.29289C9.89464 3.48043 10 3.73478 10 4C10 4.26522 9.89464 4.51957 9.70711 4.70711C9.51957 4.89464 9.26522 5 9 5H8C7.20435 5 6.44129 5.31607 5.87868 5.87868C5.31607 6.44129 5 7.20435 5 8V16C5 16.7957 5.31607 17.5587 5.87868 18.1213C6.44129 18.6839 7.20435 19 8 19H16C16.7956 19 17.5587 18.6839 18.1213 18.1213C18.6839 17.5587 19 16.7957 19 16V15C19 14.7348 19.1054 14.4804 19.2929 14.2929C19.4804 14.1054 19.7348 14 20 14C20.2652 14 20.5196 14.1054 20.7071 14.2929C20.8946 14.4804 21 14.7348 21 15V16C21 17.3261 20.4732 18.5979 19.5355 19.5355C18.5979 20.4732 17.3261 21 16 21H8C6.67392 21 5.40215 20.4732 4.46447 19.5355C3.52678 18.5979 3 17.3261 3 16V8Z" fill="#8A96A8" />
          </svg>
        </Button>
      </Flex>
    </VStack>
  );
};