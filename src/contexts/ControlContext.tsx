import { createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Employee } from "../@types/Employee";
import { Collector } from "../@types/Collector";
// import userTest from "./userTest.json";

interface CustomError {
  hasError: boolean;
  msg: string;
}

interface IPropsCadastro {
  error: CustomError | null;
  cadastro: (numero: string, sn: string) => void;
  setError: any;
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
  setError: () => {
    throw new Error("Function not implemented.");
  },
};

export const ControlContext = createContext<IPropsCadastro>(initialProps);

export const ControlProvider = ({ children }: CadastroProviderProps) => {
  // const navigate = useNavigate();
  const [error, setError] = useState<CustomError | null>(null);

  const validarCadastro = (mat: string, sn: string) => {
    const recoveredUsers = localStorage.getItem("activeUser_db");

    if (recoveredUsers) {
      const hasRecoveredUsers = JSON.parse(recoveredUsers);
      const hasUserActive = hasRecoveredUsers.filter(
        (employee: Employee) => employee.mat === mat
      );
      const hasCollectorActive = hasRecoveredUsers.filter(
        (collector: Collector) => collector.sn === sn
      );
      if (hasUserActive.length > 0 || hasCollectorActive.length > 0) {
        setError({
          hasError: true,
          msg: "Ops, parece que a matrícula já está cadastrada.",
        });
        return false;
      }
    }
    return true;
  };

  const cadastrar = (mat: string, sn: string) => {
    const isValid = validarCadastro(mat, sn);
    // TODO: a ideia está correta, esta buscando o valor  correto, porem preciso mudar do valor
    // que está vindo corretamente => teste MAT: 1441141213 T: NOITE para => 1441141213
    // estamos trabalhando apenas na tela control. importante!!!
    // console.log(mat);
    // console.log(isValid);
    if (isValid) {
      const recoveredUsers = localStorage.getItem("employee_db");
      if (recoveredUsers) {
        // const convertRecoveredUsers = JSON.parse(recoveredUsers);
        // console.log(convertRecoveredUsers);
        // const activeEmployee = convertRecoveredUsers?.find(
        //   (employee: Employee) => mat === employee.mat
        // );
        // console.log("Cadastrado", activeEmployee);
      }
    }
  };

  const cadastro = async (mat: string, sn: string) => {
    setError(null);
    cadastrar(mat, sn);
  };
  return (
    <ControlContext.Provider
      value={{
        error,
        setError,
        cadastro,
      }}
    >
      {children}
    </ControlContext.Provider>
  );
};
