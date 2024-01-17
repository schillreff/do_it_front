import { Flex, useBreakpointValue, useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { ModalError } from '../../components/Modal/ModalError';
import { ModalSuccess } from '../../components/Modal/ModalSuccess';
import { api } from '../../services/api';
import { GoBackButton } from './GoBackButton';
import { SignupForm } from './SignupForm';
import { SignupInfo } from './SignupInfo';

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
  const [error, setError] = useState('');

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const {
    isOpen: isModalSuccessOpen,
    onOpen: onModalSuccessOpen,
    onClose: onModalSuccessClose,
  } = useDisclosure();
  const {
    isOpen: isModalErrorOpen,
    onOpen: onModalErrorOpen,
    onClose: onModalErrorClose,
  } = useDisclosure();

  const handleSignUp = ({ name, email, password }: SignUpData) => {
    setLoading(true);
    api
      .post('/register', { name, email, password })
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        onModalSuccessOpen();
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
        onModalErrorOpen();
      });
  };

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  const history = useHistory();

  return (
    <>
      <ModalSuccess
        buttonMMessage='Ir para o login agora'
        message='Seu cadastro deu super certo, <b>vamos lá</b>'
        onClick={() => history.push('/')}
        secondaryText='Você já pode começar criando <b>suas listas</b> de tarefas agora mesmo...'
        isOpen={isModalSuccessOpen}
        onClose={onModalSuccessClose}
      />
      <ModalError
        error={error}
        isOpen={isModalErrorOpen}
        onClose={onModalErrorClose}
      />
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
    </>
  );
};
