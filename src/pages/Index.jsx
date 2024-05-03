import React, { useState } from 'react';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Heading,
  VStack,
  useToast
} from '@chakra-ui/react';
import { FaCalendarAlt } from 'react-icons/fa';

const fruitShelfLife = {
  bananas: 7,
  apples: 30,
  strawberries: 5
};

const Index = () => {
  const [fruit, setFruit] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [expirationDates, setExpirationDates] = useState([]);
  const toast = useToast();

  const calculateExpirationDate = () => {
    if (!fruit || !purchaseDate) {
      toast({
        title: 'Error',
        description: 'Please fill all fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const daysToAdd = fruitShelfLife[fruit.toLowerCase()];
    if (!daysToAdd) {
      toast({
        title: 'Error',
        description: 'Invalid fruit type',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const purchase = new Date(purchaseDate);
    purchase.setDate(purchase.getDate() + daysToAdd);

    const expirationDate = purchase.toISOString().split('T')[0];
    setExpirationDates([...expirationDates, { fruit, expirationDate }]);
  };

  return (
    <Flex direction="column" align="center" justify="center" p={10}>
      <Heading mb={6}>Fruit Expiration Tracker</Heading>
      <Box width={{ base: '90%', md: '50%' }} p={4} borderWidth="1px" borderRadius="lg">
        <VStack spacing={4}>
          <FormControl>
            <FormLabel htmlFor='fruit'>Fruit Type</FormLabel>
            <Input id='fruit' type='text' value={fruit} onChange={(e) => setFruit(e.target.value)} placeholder='Enter fruit type (e.g., bananas)' />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='purchase-date'>Purchase Date</FormLabel>
            <Flex align="center">
              <Input id='purchase-date' type='date' value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} />
              <FaCalendarAlt />
            </Flex>
          </FormControl>
          <Button colorScheme='blue' onClick={calculateExpirationDate}>Calculate Expiration Date</Button>
        </VStack>
      </Box>
      <Box mt={6} width={{ base: '90%', md: '50%' }} p={4} borderWidth="1px" borderRadius="lg">
        <Heading size="md" mb={4}>Expiration Dates</Heading>
        {expirationDates.map((item, index) => (
          <Text key={index}>{item.fruit.charAt(0).toUpperCase() + item.fruit.slice(1)} expires on {item.expirationDate}</Text>
        ))}
      </Box>
    </Flex>
  );
};

export default Index;