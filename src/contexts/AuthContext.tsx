import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { api } from '../services/api';

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  accessToken: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  accessToken: string;
  signIn: (credentials: SignInCredentials) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be within an AuthProvider');
  }

  return context;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [data, setData] = useState<AuthState>(() => {
    const accessToken = localStorage.getItem('@Doit:accessToken');
    const user = localStorage.getItem('@Doit:user');

    if (accessToken && user) {
      return { accessToken, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('/login', { email, password });
    const { accessToken, user } = response.data;

    localStorage.setItem('@Doit:accessToken', accessToken);
    localStorage.setItem('@Doit:user', JSON.stringify(user));

    setData({ accessToken, user });
  }, []);

  const value = useMemo(
    () => ({ signIn, user: data.user, accessToken: data.accessToken }),
    [signIn, data.accessToken, data.user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
