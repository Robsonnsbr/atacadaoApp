import { createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { User } from "../@types/User";

interface CustomError {
  hasError: boolean;
  msg: string;
}

interface IPropsCadastro {
  error: CustomError | null;
  cadastro: (
    name: string,
    mat: string,
    confirmMat: string,
    password: string,
    confirmPassword: string
  ) => void;
}

interface CadastroProviderProps {
  children: JSX.Element;
}

const initialProps: IPropsCadastro = {
  error: {
    hasError: false,
    msg: "",
  },
  cadastro: () => {
    throw new Error("Function not implemented.");
  },
};

export const CadastroContext = createContext<IPropsCadastro>(initialProps);

export const CadastroProvider = ({ children }: CadastroProviderProps) => {
  // const navigate = useNavigate();
  const [error, setError] = useState<CustomError | null>(null);

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
          return setError({
            hasError: true,
            msg: "Ops, parece que a matrícula já está cadastrada.",
          });
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
      setError({
        hasError: false,
        msg: "Seu cadastro foi concluído com sucesso.",
      });
      // return navigate("/AppCollector/login");
    } else {
      return setError({
        hasError: true,
        msg: "Os dados inseridos não estão corretos. Verifique novamente.",
      });
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
