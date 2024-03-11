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
import { theme } from '../../styles/theme';
import { useTasks } from '../../contexts/TasksContext';
import { useAuth } from '../../contexts/AuthContext';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}
interface CardProps {
  task: Task;
}

export const Card = ({ task }: CardProps) => {
  const { user, accessToken } = useAuth();
  const { updateTask, deleteTask } = useTasks();

  return (
    <Box
      cursor={'pointer'}
      _hover={{ transform: 'translate(-7px)', borderColor: 'gray.100' }}
      transition={'border 0.2s, ease 0s, transform 0.2s'}
      borderWidth={'1px'}
      borderColor={'gray.50'}
      boxShadow={'base'}
      padding={'7'}
      w={['80vw', 'auto']}
    >
      <Flex justify={'space-between'}>
        <Heading as={'h1'} size={'md'}>
          {task.title}
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
            onClick={() => deleteTask(task.id, accessToken)}
          >
            <FaTrash color={theme.colors.gray[300]} />
          </Center>
          <Center
            as={'button'}
            w={'30px'}
            h={'30px'}
            borderWidth={'1px'}
            borderRadius={'5px'}
            borderColor={'gray.200'}
            bgColor={'white'}
            onClick={() => updateTask(task.id, user.id, accessToken)}
          >
            <FaCheck color={theme.colors.gray[300]} />
          </Center>
        </HStack>
      </Flex>
      <Box w={'100%'} mt={'4'}>
        <Text>{task.description}</Text>
        <Progress
          colorScheme='purple'
          mt={'2.5'}
          value={task.completed ? 100 : 10}
        />
        <Text color={'gray.200'} mt={'3'}>
          17 february 2024
        </Text>
      </Box>
    </Box>
  );
};
