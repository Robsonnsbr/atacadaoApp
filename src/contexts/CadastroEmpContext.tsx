import { createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { User } from "../@types/User";
// import userTest from "./userTest.json";

interface CustomError {
  hasError: boolean;
  msg: string;
}

interface IPropsCadastro {
  error: CustomError | null;
  cadastro: (name: string, mat: string, confirmMat: string) => void;
  deleteEmployee: (mat: string) => void;
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
  deleteEmployee: () => {
    throw new Error("Function not implemented.");
  },
};

export const CadastroEmpContext = createContext<IPropsCadastro>(initialProps);

export const CadastroEmpProvider = ({ children }: CadastroProviderProps) => {
  // const navigate = useNavigate();
  const [error, setError] = useState<CustomError | null>(null);

  const deleteEmployee = (mat?: string) => {
    const recoveredUser = localStorage.getItem("employee_db");
    if (mat && recoveredUser) {
      const users = JSON.parse(recoveredUser);
      const index = users.findIndex((user: User) => user.mat === mat);

      if (index !== -1) {
        // const currentUser: User = users[index];
        users.splice(index, 1);
        localStorage.setItem("employee_db", JSON.stringify(users));
        // alert(`Usuário ${currentUser.mat} Excluído com sucesso!`);
      }
    }
  };

  const cadastro = async (name: string, mat: string, confirmMat: string) => {
    console.log("entrei aqui");
    if (mat === confirmMat) {
      setError(null);
      const recoveredUsers = localStorage.getItem("employee_db");

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
        const parsedRecoveredUsers: User[] = JSON.parse(recoveredUsers);
        parsedRecoveredUsers.push({ name, mat });
        localStorage.setItem(
          "employee_db",
          JSON.stringify(parsedRecoveredUsers)
        );
      } else {
        localStorage.setItem("employee_db", JSON.stringify([{ name, mat }]));
      }
      // const usersTestConvert = JSON.stringify(userTest);
      // localStorage.setItem("users_db", usersTestConvert);
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
    <CadastroEmpContext.Provider
      value={{
        error,
        cadastro,
        deleteEmployee,
      }}
    >
      {children}
    </CadastroEmpContext.Provider>
  );
};
