import { Flex } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import { LoginForm } from './LoginForm';
import { LoginInfo } from './LoginInfo';

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
      alignItems={'center'}
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
        <LoginInfo />
        <LoginForm
          handleSignIn={handleSubmit(handleSignIn)}
          errors={errors}
          register={register}
          loading={loading}
        />
      </Flex>
    </Flex>
  );
};
