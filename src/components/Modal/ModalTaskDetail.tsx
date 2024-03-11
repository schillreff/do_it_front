import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { FaCheck, FaExclamation, FaTimes, FaTrash } from 'react-icons/fa';
import { theme } from '../../styles/theme';
import { useAuth } from '../../contexts/AuthContext';
import { useTasks } from '../../contexts/TasksContext';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface ModalTaskDetailProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

export const ModalTaskDetail = ({
  isOpen,
  onClose,
  task,
}: ModalTaskDetailProps) => {
  const { user, accessToken } = useAuth();
  const { deleteTask, updateTask } = useTasks();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent padding={'2'} bg={'white'} color={'gray.800'}>
        <ModalHeader display={'flex'}>
          <Center bg={'purple.500'} w={'30px'} h={'30px'} borderRadius={'5px'}>
            <FaExclamation color={theme.colors.white} />
          </Center>
          <Text fontWeight={'bold'} ml={'2'}>
            Visualizar
          </Text>
          <HStack spacing={'2'}>
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
            <Center
              onClick={onClose}
              as={'button'}
              ml={'auto'}
              w={'30px'}
              h={'30px'}
              bg={'red.500'}
              fontSize={'lg'}
              borderRadius={'md'}
            >
              <FaTimes color={theme.colors.white} />
            </Center>
          </HStack>
        </ModalHeader>

        <ModalBody textAlign={'center'}>
          <Heading as={'h1'} fontSize={'2xl'}>
            {task.title}
          </Heading>
          <Text>{task.description}</Text>
        </ModalBody>

        <ModalFooter flexDirection={'column'}></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
