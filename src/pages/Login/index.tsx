import {
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import * as yup from 'yup';
import LogoPrimary from '../../assets/logo-primary.svg';
import { Input } from '../../components/Form/input';

const signInSchema = yup.object().shape({
  email: yup.string().required('Email obrigatório').email('Email inválido'),
  password: yup.string().required('Senha obrigatória'),
});

interface SignInData {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const handleSignIn = (data: SignInData) => console.log(data);

  return (
    <Flex
      padding='10px 15px'
      alignItems='center'
      height='100vh'
      bgGradient='linear(to-r, purple.800 65%, white 35%)'
      color='white'
    >
      <Flex
        w={'100%'}
        justifyContent={'center'}
        flexDirection={'row'}
        alignItems={'center'}
      >
        <Grid w={'100%'} paddingRight={'100px'}>
          <Image src={LogoPrimary} alt='doit' boxSize={'120px'} />
          <Heading as={'h1'}> O jeito fácil, grátis</Heading>
          <Text>
            Flexível e atrativo de gerenciar{' '}
            <b>seus projetos em uma única plataforma</b>
          </Text>
        </Grid>
        <Grid
          onSubmit={handleSubmit(handleSignIn)}
          as={'form'}
          mt={'4'}
          w={'50%'}
          padding={'30px 15px'}
          border={'3px solid'}
          borderColor={'gray.100'}
          bg={'white'}
          color={'gray.900'}
        >
          <Heading size={'lg'}>Bem vindo de volta!</Heading>
          <VStack mt={'6'} spacing={'5'}>
            <Input
              placeholder={'Digite seu login'}
              icon={FaEnvelope}
              label='Login'
              type='email'
              error={errors.email}
              name='email'
            />
            <Input
              placeholder={'Digite sua senha'}
              icon={FaLock}
              label='Senha'
              type='password'
              error={errors.password}
              {...register('password')}
            />
          </VStack>
          <Button type='submit'>Entrar</Button>
        </Grid>
      </Flex>
    </Flex>
  );
};
