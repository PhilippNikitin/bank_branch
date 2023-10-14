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
  AccordionPanel
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

export const SideDrawerBankCard = () => {
  const [selectedClient, setSelectedClient] = useState('');
  const [isWorkingTimeOn, setIsWorkingTimeOn] = useState(false);
  const [isAccessibilityOn, setIsAccessibilityOn] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDay, setSelectedDay] = useState('Monday');

  const handleClientSelection = (client) => {
    setSelectedClient(client);
  };

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
      <Heading size={'sm'} as="h2">
        {mockBank[0].name}
      </Heading>

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
                  width="50px"
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

      <FormControl>
        <FormLabel>Clients</FormLabel>
        <ButtonGroup isAttached>
          {["persons", "privelege", "prime", "organizations"].map((client) => (
            <Button
              key={client}
              isActive={selectedClient === client}
              onClick={() => handleClientSelection(client)}
            >
              {client}
            </Button>
          ))}
        </ButtonGroup>
      </FormControl>

      <Divider />

      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="working-time" mb={0}>
          Working Time
        </FormLabel>
        <Switch
          id="working-time"
          isChecked={isWorkingTimeOn}
          onChange={handleWorkingTimeToggle}
          ml={2}
        />
      </FormControl>

      <Divider />

      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="accessibility" mb={0}>
          Accessibility
        </FormLabel>
        <Switch
          id="accessibility"
          isChecked={isAccessibilityOn}
          onChange={handleAccessibilityToggle}
          ml={2}
        />
      </FormControl>

      <Divider />

      <FormControl>
        <FormLabel>Services</FormLabel>
        <ButtonGroup isAttached>
          {[
            "loans",
            "cards",
            "ipoteka",
            "autoloan",
            "deposit",
            "savings",
            "insurance",
            "pension",
            "currency",
            "remittance",
            "investments",
            "mobile-banking",
          ].map((service) => (
            <Checkbox
              key={service}
              isChecked={selectedServices.includes(service)}
              onChange={() => handleServiceSelection(service)}
            >
              {service}
            </Checkbox>
          ))}
        </ButtonGroup>
      </FormControl>
    </VStack>
  );
};