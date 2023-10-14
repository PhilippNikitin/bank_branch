import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Link,
  Stack,
  Switch,
  Text,
  VStack,
  useTheme,
} from '@chakra-ui/react';
import { useState } from 'react';

export const SideDrawerFilter = () => {
  const theme = useTheme();
  const [selectedClient, setSelectedClient] = useState('');
  const [isWorkingTimeOn, setIsWorkingTimeOn] = useState(false);
  const [isAccessibilityOn, setIsAccessibilityOn] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

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

  const handleMoreServicesClick = () => {
    // Handle "More Services" button click
  };

  return (
    <VStack align="stretch" spacing={3}>
      <Heading size={'sm'}>Фильтры отделений</Heading>
      <FormControl >
        <FormLabel>Клиенты</FormLabel>
        <Flex wrap={"wrap"} gap={"8px"}>
          <Button
            borderColor={theme.colors.blue.vtb_primary}
            type="button"
            variant={'base'}
            isActive={selectedClient === 'persons'}
            onClick={() => handleClientSelection('persons')}
          >
            Физические лица
          </Button>
          <Button
            borderColor={theme.colors.blue.vtb_primary}
            type="button"
            variant={'base'}
            isActive={selectedClient === 'privelege'}
            onClick={() => handleClientSelection('privelege')}
          >
            Привилегия
          </Button>
          <Button
            borderColor={theme.colors.blue.vtb_primary}
            type="button"
            variant={'base'}
            isActive={selectedClient === 'prime'}
            onClick={() => handleClientSelection('prime')}
          >
            Прайм
          </Button>
          <Button
            borderColor={theme.colors.blue.vtb_primary}
            type="button"
            variant={'base'}
            isActive={selectedClient === 'organizations'}
            onClick={() => handleClientSelection('organizations')}
          >
            Юридические лица
          </Button>
        </Flex>
      </FormControl>

      <Divider />

      <FormControl display="flex" flexDir={"column"} gap={"16px"}>
        <FormLabel htmlFor="working-time" mb={0}>
          Время работы
        </FormLabel>
        <Flex justifyContent={"space-between"}>
          <Text>Работает сейчас</Text>
          <Switch
            id="working-time"
            isChecked={isWorkingTimeOn}
            onChange={handleWorkingTimeToggle}
            ml={2}
          />
        </Flex>
      </FormControl>

      <Divider />

      <FormControl display="flex" flexDir={"column"} alignItems="flex-start" gap={"16px"}>
        <FormLabel htmlFor="accessibility" mb={0}>
          Доступная среда
        </FormLabel>
        <Flex justifyContent={"space-between"}>
          <Text>Доступно для маломобильных граждан</Text>
          <Switch
            id="accessibility"
            isChecked={isAccessibilityOn}
            onChange={handleAccessibilityToggle}
            ml={2}
          />
        </Flex>
      </FormControl>

      <Divider />

      <FormControl>
        <FormLabel>Services</FormLabel>
        <Flex wrap={"wrap"} gap={"8px"}>
          <Button
            borderColor={theme.colors.blue.vtb_primary}
            type="button"
            variant='base'
            isActive={selectedServices.includes('loans')}
            onClick={() => handleServiceSelection('loans')}
          >
            Кредиты
          </Button>
          <Button
            borderColor={theme.colors.blue.vtb_primary}
            type="button"
            variant='base'
            isActive={selectedServices.includes('cards')}
            onClick={() => handleServiceSelection('cards')}
          >
            Карты
          </Button>
          <Button
            borderColor={theme.colors.blue.vtb_primary}
            type="button"
            variant='base'
            isActive={selectedServices.includes('ipoteka')}
            onClick={() => handleServiceSelection('ipoteka')}
          >
            Ипотека
          </Button>
          <Button
            borderColor={theme.colors.blue.vtb_primary}
            type="button"
            variant='base'
            isActive={selectedServices.includes('autoloan')}
            onClick={() => handleServiceSelection('autoloan')}
          >
            Автокредиты
          </Button>
          <Button
            borderColor={theme.colors.blue.vtb_primary}
            type="button"
            variant='base'
            isActive={selectedServices.includes('deposit')}
            onClick={() => handleServiceSelection('deposit')}
          >
            Вклады и счета
          </Button>
          <Button
            borderColor={theme.colors.blue.vtb_primary}
            type="button"
            variant='base'
            isActive={selectedServices.includes('investments')}
            onClick={() => handleServiceSelection('investments')}
          >
            Инвестиции
          </Button>
          <Button
            borderColor={theme.colors.blue.vtb_primary}
            type="button"
            variant='base'
            isActive={selectedServices.includes('online-services')}
            onClick={() => handleServiceSelection('online-services')}
          >
            Онлайн-сервисы          </Button>
        </Flex>
        <Link color={theme.colors.blue.vtb_primary} onClick={handleMoreServicesClick} mt={4} >
          Больше услуг
        </Link>
      </FormControl>

      <Button variant={"secondary"} onClick={handleMoreServicesClick} bgColor={theme.colors.blue.vtb_primary} mt={4} >
        Применить
      </Button>
      <Link textAlign={'center'} color={theme.colors.blue.vtb_primary} onClick={handleMoreServicesClick} mt={4} >
        Сбросить все фильтры
      </Link>
    </VStack>
  );
};