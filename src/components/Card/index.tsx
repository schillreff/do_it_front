import {
  Box,
  Center,
  Flex,
  HStack,
  Heading,
  Progress,
  Text,
} from '@chakra-ui/react';
import { FaCheck, FaTrash } from 'react-icons/fa';

export const Card = () => {
  return (
    <Box
      cursor={'pointer'}
      _hover={{ transform: 'translate(-7px)', borderColor: 'gray.100' }}
      transition={'border 0.2s, ease 0s, transform 0.2s'}
      borderWidth={'1px'}
      borderColor={'gray.50'}
      boxShadow={'base'}
      padding={'7'}
      w={['330px', 'auto']}
    >
      <Flex justify={'space-between'}>
        <Heading as={'h1'} size={'md'}>
          Studying data-base concenpts
        </Heading>
        <HStack spacing={'4'}>
          <Center
            as={'button'}
            w={'30px'}
            h={'30px'}
            borderWidth={'1px'}
            borderRadius={'5px'}
            borderColor={'gray.200'}
            bgColor={'white'}
          >
            <FaTrash color='gray.200' />
          </Center>
          <Center
            as={'button'}
            w={'30px'}
            h={'30px'}
            borderWidth={'1px'}
            borderRadius={'5px'}
            borderColor={'gray.200'}
            bgColor={'white'}
          >
            <FaCheck color='gray.200' />
          </Center>
        </HStack>
      </Flex>
      <Box w={'100%'} mt={'4'}>
        <Text>Start Study, a description for the task</Text>
        <Progress colorScheme='purple' mt={'2.5'} value={10} />
        <Text color={'gray.200'} mt={'3'}>
          17 february 2024
        </Text>
      </Box>
    </Box>
  );
};