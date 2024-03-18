import { Box, Button, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import {
  DeepMap,
  FieldError,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { Input } from '../../components/Form/input';

interface SignUpProps {
  handleSignUp: () => void;
  errors: DeepMap<FieldValues, FieldError>;
  register: UseFormRegister<{
    name: string;
    email: string;
    password: string;
    confirm_password: string;
  }>;
  loading: boolean;
}

export const SignupForm = ({
  handleSignUp,
  errors,
  register,
  loading,
}: SignUpProps) => (
  <Grid
    onSubmit={handleSignUp}
    as={'form'}
    w={['100%', '320px', '350px', '400px']}
    mt={['4', '4', '0', '0']}
    padding={'30px 25px'}
    border={'3px solid'}
    borderColor={'gray.100'}
    borderRadius={'8px'}
    bg={'white'}
    color={'gray.900'}
  >
    <Heading size={'lg'}>Crie sua conta</Heading>
    <VStack mt={'6'} spacing={'5'}>
      <Input
        placeholder={'Digite seu nome'}
        icon={FaUser}
        label={'Nome'}
        error={errors.name}
        {...register('name')}
      />
      <Box w={'100%'}>
        <Input
          placeholder={'Digite seu login'}
          icon={FaEnvelope}
          label={'Email'}
          type={'email'}
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
        label={'Senha'}
        type={'password'}
        error={errors.password}
        {...register('password')}
      />
      <Input
        placeholder={'Confirme sua senha'}
        icon={FaLock}
        label={'Confirmaçao de senha'}
        type={'password'}
        error={errors.confirm_password}
        {...register('confirm_password')}
      />
    </VStack>

    <Button
      w={'100%'}
      mt={'8'}
      isLoading={loading}
      bg={'purple.800'}
      color={'white'}  
      h={'60px'}
      borderRadius={'8px'}
      _hover={{ background: 'purple.900' }}
      type='submit'
    >
      Finalizar Cadastro
    </Button>
  </Grid>
);
