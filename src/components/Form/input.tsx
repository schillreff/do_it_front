import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { FieldError } from 'react-hook-form';
import { IconType } from 'react-icons';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError | null;
  icon?: IconType;
}

type inputVariationOptions = {
  [key: string]: string;
};

const inputVariation: inputVariationOptions = {
  error: 'red.500',
  default: 'gray.200',
  focus: 'purple.800',
  filled: 'green.500',
};

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, error = null, icon: Icon, label, ...rest },
  ref,
) => {
  const [variation, setVariation] = useState('default');
  const [value, setValue] = useState('');

  useEffect(() => {
    if (error) {
      return setVariation('error');
    }
  }, [error]);

  const handleInputFocus = useCallback(() => {
    if (!error) {
      return setVariation('focus');
    }
  }, [error]);

  const handleInputBlur = useCallback(() => {
    if (value.length > 1 && !error) {
      return setVariation('filled');
    }
  }, [error, value]);

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel color={'gray.400'}>{label}</FormLabel>}

      <InputGroup flexDirection={'column'}>
        {Icon && (
          <InputLeftElement color={inputVariation[variation]} mt={'2.5'}>
            <Icon />
          </InputLeftElement>
        )}

        <ChakraInput
          name={name}
          onChangeCapture={(event) => setValue(event.currentTarget.value)}
          onBlurCapture={handleInputBlur}
          onFocus={handleInputFocus}
          borderColor={inputVariation[variation]}
          color={inputVariation[variation]}
          bg={'gray.50'}
          variant={'outline'}
          _hover={{ bgColor: 'gray.100' }}
          _placeholder={{ color: 'gray.400' }}
          size={'lg'}
          h={'60px'}
          ref={ref}
          {...rest}
        />

        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </InputGroup>
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
