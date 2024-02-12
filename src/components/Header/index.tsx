import { Center, Flex, Heading, Image, useDisclosure } from '@chakra-ui/react';
import Logo from '../../assets/icon.svg';
import { theme } from '../../styles/theme';
import { Menu } from './Menu';
import { FaTh } from 'react-icons/fa';
export const Header = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  return (
    <Flex
      borderBottom={'1px'}
      borderColor={theme.colors.gray[25]}
      paddingX={'8'}
      paddingY={'2'}
    >
      <Flex align={'center'}>
        <Image src={Logo} />
        <Heading ml={'4'} size={'lg'}>
          Dashboard
        </Heading>
      </Flex>
      <Center ml={'auto'} onClick={onToggle} as='button' fontSize={'2rem'}>
        <FaTh color={theme.colors.gray[300]} />
      </Center>
      <Menu isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};
