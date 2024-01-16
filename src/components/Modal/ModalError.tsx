import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { FaExclamation } from 'react-icons/fa';
import { theme } from '../../styles/theme';

interface ModalErrorProps {
  isOpen: boolean;
  onClose: () => void;
  error: string;
}

export const ModalError = ({ isOpen, onClose, error }: ModalErrorProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent color={'gray.800'}>
      <ModalHeader display={'flex'}>
        <Center bg={'red.500'} w={'30px'} h={'30px'} borderRadius={'5px'}>
          <FaExclamation color={theme.colors.white} />
        </Center>
        <Text fontWeight={'bold'} ml={'2'}>
          Oops!
        </Text>
      </ModalHeader>
      <ModalCloseButton
        bg={'red.500'}
        color={'white'}
        _hover={{ bg: 'red.600' }}
      />
      <ModalBody color={'gray.400'} textAlign={'center'}>
        <Text>
          {' '}
          Ocorreu algum erro! <b>{error}</b>{' '}
        </Text>
      </ModalBody>
      <ModalFooter display={'column'}>
        <Button
          bg={'red.500'}
          color={'white'}
          w={'100%'}
          h={'60px'}
          _hover={{ bg: 'red.600' }}
          onClick={onClose}
        >
          Tentar novamente
        </Button>
        <Text mt={'4'} textAlign={'center'}>
          Você já pode tentar novamente, <b>clicando</b> no botão acima ou
          aguarde alguns minutos ...
        </Text>
      </ModalFooter>
    </ModalContent>
  </Modal>
);
