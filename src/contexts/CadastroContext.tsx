import { createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { User } from "../@types/User";

interface IPropsCadastro {
  error: null | string;
  cadastro: (
    name: string,
    mat: string,
    password: string,
    confirmEmail: string,
    confirmPassword: string
  ) => void;
}

interface CadastroProviderProps {
  children: JSX.Element;
}

const initialProps: IPropsCadastro = {
  error: null,
  cadastro: () => {
    throw new Error("Function not implemented.");
  },
};

export const CadastroContext = createContext<IPropsCadastro>(initialProps);

export const CadastroProvider = ({ children }: CadastroProviderProps) => {
  // const navigate = useNavigate();
  const [error, setError] = useState<null | string>(null);

  const cadastro = async (
    name: string,
    mat: string,
    confirmMat: string,
    password: string,
    confirmePassword: string
  ) => {
    console.log("entrei no cadastro");
    if (mat === confirmMat && password === confirmePassword) {
      setError(null);
      const recoveredUsers = localStorage.getItem("users_db");

      if (recoveredUsers) {
        const hasRecoveredUsers = JSON.parse(recoveredUsers);
        const hasUser = hasRecoveredUsers.filter(
          (user: User) => user.mat === mat
        );

        if (hasUser.length > 0) {
          return setError("Matricula já cadastrado!");
        }
      }

      if (recoveredUsers) {
        const parsedRecoveredUsers = JSON.parse(recoveredUsers);
        parsedRecoveredUsers.push({ name, mat, password });
        localStorage.setItem("users_db", JSON.stringify(parsedRecoveredUsers));
      } else {
        localStorage.setItem(
          "users_db",
          JSON.stringify([{ name, mat, password }])
        );
      }
      alert("Sucesso no cadastro!");
      // return navigate("/AppCollector/login");
    } else {
      return setError("Os dados informados não conferem!");
    }
  };

  return (
    <CadastroContext.Provider
      value={{
        error,
        cadastro,
      }}
    >
      {children}
    </CadastroContext.Provider>
  );
};
