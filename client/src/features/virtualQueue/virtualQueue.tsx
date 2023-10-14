import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Heading,
  Text,
  Input,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export const VisitModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    // Get the current date
    const currentDate = new Date();

    // Format the date as YYYY-MM-DD
    const formattedDate = currentDate.toISOString().slice(0, 10);

    // Set the initial date to today
    setDate(formattedDate);
  }, []);
  // Function to handle form submission
  const handleSubmit = () => {
    // Perform actions with email and date data
    // ...

    // Close the modal
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg='blackAlpha.500'
        backdropFilter='blur(4px) hue-rotate(10deg)' />
      <ModalContent>
        <ModalHeader bgColor={"black"} color={'white'}>
          <Heading size={"md"}>Запись на посещение в variable</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody bgColor={"black"} color={'white'}>
          <Text color="white" fontSize="sm">
            Контактные данные:
          </Text>
          <Input
            placeholder="Адрес электронной почты"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            mt={4}
          />
          <Text color="white" fontSize="sm">
            Дата посещения:
          </Text>
          <Input
            type="date"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            mt={4}
          />
          <Grid templateColumns="repeat(4, 1fr)" gap={2} mt={4}>
            {/* Generate suggested times dynamically */}
            {Array.from({ length: 8 }, (_, i) => i + 10).map((time) => (
              <GridItem key={time}>{`${time}:00`}</GridItem>
            ))}
          </Grid>
        </ModalBody>
        <ModalFooter bgColor={"black"} color={'white'}>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Запланировать визит
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal >
  );
}
