import { Flex, useBreakpointValue } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { SignupForm } from './SignupForm';
import { SignupInfo } from './SignupInfo';
import { GoBackButton } from './GoBackButton';

const signUpSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('Email obrigatório').email('Email inválido'),
  password: yup.string().required('Senha obrigatória'),
  confirm_password: yup
    .string()
    .required('Confirmação de senha obrigatória')
    .oneOf([yup.ref('password')], 'Senhas diferentes'),
});

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const handleSignUp = (data: SignUpData) => {
    console.log(data);
  };

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <Flex
      padding={['10px 15px', '10px 15px', '0px', '0px']}
      alignItems='center'
      justifyContent={'center'}
      height={['auto', 'auto', '100vh', '100vh']}
      bgGradient={[
        'linear(to-b, purple.800 65%, white 35%)',
        'linear(to-b, purple.800 65%, white 35%)',
        'linear(to-l, purple.800 65%, white 35%)',
        'linear(to-l, purple.800 65%, white 35%)',
      ]}
      color='white'
    >
      <Flex
        w={['100%', '100%', '90%', '65%']}
        justifyContent={'center'}
        flexDirection={['column', 'column', 'row', 'row']}
      >
        {isWideVersion ? (
          <>
            <GoBackButton top='85' left='24' />
            <SignupForm
              handleSignUp={handleSubmit(handleSignUp)}
              errors={errors}
              register={register}
              loading={loading}
            />
            <SignupInfo />
          </>
        ) : (
          <>
            <GoBackButton top='10' left='75vw' />
            <SignupInfo />
            <SignupForm
              handleSignUp={handleSubmit(handleSignUp)}
              errors={errors}
              register={register}
              loading={loading}
            />
          </>
        )}
      </Flex>
    </Flex>
  );
};
