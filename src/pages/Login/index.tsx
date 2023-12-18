import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import * as yup from 'yup';
import LogoPrimary from '../../assets/logo-primary.svg';
import { Input } from '../../components/Form/input';
import { useAuth } from '../../contexts/AuthContext';

const signInSchema = yup.object().shape({
  email: yup.string().required('Email obrigatório').email('Email inválido'),
  password: yup.string().required('Senha obrigatória'),
});

interface SignInData {
  email: string;
  password: string;
}

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const handleSignIn = (data: SignInData) => {
    setLoading(true);
    signIn(data)
      .then((_) => setLoading(false))
      .catch((err) => setLoading(false));
  };

  return (
    <Flex
      padding={['10px 15px', '10px 15px', '0px', '0px']}
      alignItems='center'
      justifyContent={'center'}
      height={['auto', 'auto', '100vh', '100vh']}
      bgGradient={[
        'linear(to-b, purple.800 65%, white 35%)',
        'linear(to-b, purple.800 65%, white 35%)',
        'linear(to-r, purple.800 65%, white 35%)',
        'linear(to-r, purple.800 65%, white 35%)',
      ]}
      color='white'
    >
      <Flex
        w={['100%', '100%', '90%', '65%']}
        justifyContent={'center'}
        flexDirection={['column', 'column', 'row', 'row']}
        alignItems={'center'}
      >
        <Grid w={['100%', '100%', '50%', '50%']}>
          <Image
            src={LogoPrimary}
            alt='doit'
            boxSize={['120px', '120px', '150px', '150px']}
          />
          <Heading mt={'4'} as={'h1'}>
            {' '}
            O jeito fácil, grátis
          </Heading>
          <Text maxW={'350px'}>
            Flexível e atrativo de gerenciar{' '}
            <b> seus projetos em uma única plataforma</b>
          </Text>
        </Grid>
        <Grid
          onSubmit={handleSubmit(handleSignIn)}
          as={'form'}
          w={['100%', '320px', '350px', '400px']}
          mt={['4', '4', '0', '0']}
          padding={'30px 15px'}
          border={'3px solid'}
          borderColor={'gray.100'}
          borderRadius={'8px'}
          bg={'white'}
          color={'gray.900'}
        >
          <Heading size={'lg'}>Bem vindo de volta!</Heading>
          <VStack mt={'6'} spacing={'5'}>
            <Box w={'100%'}>
              <Input
                placeholder={'Digite seu login'}
                icon={FaEnvelope}
                label='Email'
                type='email'
                error={errors.email}
                {...register('email')}
              />
              {!errors.email && (
                <Text ml={'1'} mt={'1'} color={'gray.300'}>
                  Exemplo: nome@email.com
                </Text>
              )}
            </Box>
            <Input
              placeholder={'Digite sua senha'}
              icon={FaLock}
              label='Senha'
              type='password'
              error={errors.password}
              {...register('password')}
            />
          </VStack>
          <VStack mt={'4'} spacing={'5'}>
            <Button
              isLoading={loading}
              bg={'purple.800'}
              w={'100%'}
              color={'white'}
              h={'60px'}
              borderRadius={'8px'}
              _hover={{ background: 'purple.900' }}
              type='submit'
            >
              Entrar
            </Button>
            <Text color={'gray.400'}> Ainda não possui uma conta?</Text>
            <Button
              bg={'gray.100'}
              w={'100%'}
              color={'gray.300'}
              h={'60px'}
              borderRadius={'8px'}
              _hover={{ background: 'gray.200' }}
              type='submit'
            >
              Cadastrar
            </Button>
          </VStack>
        </Grid>
      </Flex>
    </Flex>
  );
};
