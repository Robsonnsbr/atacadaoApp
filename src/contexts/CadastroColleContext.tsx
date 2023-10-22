import { createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Collector } from "../@types/Collector";
// import userTest from "./userTest.json";

interface CustomError {
  hasError: boolean;
  msg: string;
}

interface IPropsCadastro {
  error: CustomError | null;
  cadastro: (numero: number, sn: string, confirmSN: string) => void;
  deleteCollector: (sn: string) => void;
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
  deleteCollector: () => {
    throw new Error("Function not implemented.");
  },
};

export const CadastroColleContext = createContext<IPropsCadastro>(initialProps);

export const CadastroColleProvider = ({ children }: CadastroProviderProps) => {
  // const navigate = useNavigate();
  const [error, setError] = useState<CustomError | null>(null);

  const deleteCollector = (sn?: string) => {
    const recoveredUser = localStorage.getItem("collector_db");
    if (sn && recoveredUser) {
      const collectors = JSON.parse(recoveredUser);
      const index = collectors.findIndex(
        (collector: Collector) => collector.sn === sn
      );

      if (index !== -1) {
        // const currentUser: Collector = collectors[index];
        collectors.splice(index, 1);
        localStorage.setItem("collector_db", JSON.stringify(collectors));
        localStorage.setItem("collector_db", JSON.stringify(collectors));
        // alert(`Usuário ${currentUser.sn} Excluído com sucesso!`);
      }
    }
  };

  const cadastro = async (numero: number, sn: string, confirmSN: string) => {
    if (sn === confirmSN) {
      setError(null);
      const recoveredUsers = localStorage.getItem("collector_db");

      if (recoveredUsers) {
        const hasRecoveredUsers = JSON.parse(recoveredUsers);
        const hasUser = hasRecoveredUsers.filter(
          (collector: Collector) => collector.sn === sn
        );

        if (hasUser.length > 0) {
          return setError({
            hasError: true,
            msg: "Ops, parece que esse número de série já está cadastrado.",
          });
        }
      }
      if (recoveredUsers) {
        const hasRecoveredUsers = JSON.parse(recoveredUsers);
        const hasUser = hasRecoveredUsers.filter(
          (collector: Collector) => collector.numero === numero
        );

        if (hasUser.length > 0) {
          return setError({
            hasError: true,
            msg: "Ops, parece que esse número de já está cadastrado.",
          });
        }
      }

      if (recoveredUsers) {
        const parsedRecoveredUsers: Collector[] = JSON.parse(recoveredUsers);
        parsedRecoveredUsers.push({ numero, sn });
        localStorage.setItem(
          "collector_db",
          JSON.stringify(parsedRecoveredUsers)
        );
      } else {
        localStorage.setItem("collector_db", JSON.stringify([{ numero, sn }]));
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
    <CadastroColleContext.Provider
      value={{
        error,
        cadastro,
        deleteCollector,
      }}
    >
      {children}
    </CadastroColleContext.Provider>
  );
};
