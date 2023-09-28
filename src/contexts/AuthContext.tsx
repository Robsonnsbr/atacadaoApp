import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  id?: string;
  email?: string;
  password?: string;
  token?: string;
};

interface IPropsAuth {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  loading?: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  deleteUser: () => void;
  error: null | string;
}

interface AuthProviderProps {
  children: JSX.Element;
}

const initialProps: IPropsAuth = {
  isAuthenticated: false,
  token: null,
  user: null,
  loading: true,
  login: () => {
    throw new Error("Function not implemented.");
  },
  logout: () => {
    throw new Error("Function not implemented.");
  },
  deleteUser: () => {
    throw new Error("Function not implemented.");
  },
  error: null,
};

export const AuthContext = createContext<IPropsAuth>(initialProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<null | string>(null);
  const [error, setError] = useState<null | string>(null);
  // const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<null | User>(null);

  useEffect(() => {
    //O await aqui não tem necessidade, mas caso haja uma
    //chamada da api é assim que conseguimos utilizar o await
    //criando uma função async auto-invocável dentro do useEffect
    (async () => {
      setError(null);
      const recoveredToken = await localStorage.getItem("token");
      const recoveredUser = await localStorage.getItem("users_db");
      if (recoveredToken && recoveredUser) {
        const hasUser = JSON.parse(recoveredUser).filter(
          (user: User) => user.email === JSON.parse(recoveredToken).email
        );
        if (hasUser) {
          setToken(recoveredToken);
          navigate("/loginReact");
        }
      }
    })();
  }, []);

  const recovered = () => {
    const recoveredToken = localStorage.getItem("token");
    const recoveredUser = localStorage.getItem("users_db");
    return { recoveredToken, recoveredUser };
  };

  const getItems = () => {
    const { recoveredToken, recoveredUser } = recovered();
    if (recoveredToken && recoveredUser) {
      const token = JSON.parse(recoveredToken);
      const users = JSON.parse(recoveredUser);
      return { token, users };
    }
    return;
  };

  const login = async (email: string, password: string) => {
    const recoveredUsers = localStorage.getItem("users_db");
    if (recoveredUsers) {
      const hasRecoveredUsers = JSON.parse(recoveredUsers);
      const hasUser = hasRecoveredUsers.filter(
        (user: User) => user.email === email
      );
      if (hasUser.length) {
        if (hasUser[0].email === email && hasUser[0].password === password) {
          const token = Math.random().toString(36).substring(2);
          localStorage.setItem("token", JSON.stringify({ email, token }));
          const currentUser: User = hasUser[0];
          setUser(currentUser);
          setToken(token);
          navigate("/loginReact");
          return;
        } else {
          setError("Email ou senha incorretos");
          setTimeout(() => {
            setError(null);
          }, 5000);
          return;
        }
      } else {
        setError("Usuário não cadastrado");
        setTimeout(() => {
          setError(null);
        }, 5000);
        return;
      }
    } else {
      setError("Usuário não cadastrado");
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }
  };

  const logout = () => {
    setToken(null);

    const items = getItems();
    if (items) {
      const { token, users } = items;

      const index = users.findIndex((user: User) => user.email === token.email);

      if (index !== -1) {
        localStorage.removeItem("token");
      } else {
        setError("Index not found");
      }
    } else {
      setError("Token/Users not found");
    }

    navigate("/loginReact/*");
  };

  const deleteUser = () => {
    setToken(null);

    const items = getItems();
    if (items) {
      const { token, users } = items;
      const index = users.findIndex((user: User) => user.email === token.email);

      if (index !== -1) {
        const currentUser: User = users[index];
        users.splice(index, 1);
        localStorage.removeItem("token");
        localStorage.setItem("users_db", JSON.stringify(users));
        alert(`Usuário ${currentUser.email} Excluído com sucesso!`);
      } else {
        setError("Index not found");
      }
    } else {
      setError("Token/Users not found");
    }

    navigate("/loginReact/*");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        token,
        login,
        logout,
        deleteUser,
        user,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
