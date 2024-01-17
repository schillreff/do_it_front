import {
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { FaExclamation, FaTimes } from 'react-icons/fa';
import { theme } from '../../styles/theme';

interface ModalSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  buttonMMessage: string;
  onClick: () => void;
  secondaryText: string;
}

export const ModalSuccess = ({
  isOpen,
  onClose,
  message,
  buttonMMessage,
  onClick,
  secondaryText,
}: ModalSuccessProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent padding={'2'} bg={'white'} color={'gray.800'}>
      <ModalHeader display={'flex'}>
        <Center bg={'purple.500'} w={'30px'} h={'30px'} borderRadius={'5px'}>
          <FaExclamation color={theme.colors.white} />
        </Center>
        <Text fontWeight={'bold'} ml={'2'}>
          Yeesss...
        </Text>
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
      </ModalHeader>
      <ModalBody textAlign={'center'}>
        <Text>
          {' '}
          <Box
            dangerouslySetInnerHTML={{
              __html: message,
            }}
          ></Box>
        </Text>
      </ModalBody>
      <ModalFooter flexDirection={'column'}>
        <Button
          bg={'purple.500'}
          color={'white'}
          w={'100%'}
          onClick={onClick}
          _hover={{ bg: 'purple.600' }}
          h={'60px'}
        >
          {buttonMMessage}
        </Button>
        <Text mt={'4'} align={'center'}>
          <Box
            dangerouslySetInnerHTML={{
              __html: secondaryText,
            }}
          ></Box>
        </Text>
      </ModalFooter>
    </ModalContent>
  </Modal>
);
