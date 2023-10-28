import { createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Employee } from "../@types/Employee";
import { Collector } from "../@types/Collector";
import { Activated } from "../@types/Activated";

interface CustomError {
  hasError: boolean;
  msg: string;
}

interface IPropsCadastro {
  error: CustomError | null;
  cadastro: (numero: string, sn: string) => void;
  setError: unknown;
  atualizarIrmao: (atualizarWithBrother: boolean) => void;
  atualizarWithBrother: boolean;
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
  atualizarIrmao: () => {
    throw new Error("Function not implemented.");
  },
  atualizarWithBrother: false,
};

export const ControlContext = createContext<IPropsCadastro>(initialProps);

export const ControlProvider = ({ children }: CadastroProviderProps) => {
  // const navigate = useNavigate();
  const [error, setError] = useState<CustomError | null>(null);
  const [atualizarWithBrother, setAtualizarIrmao] = useState<boolean>(false);

  // const validarCadastro = (mat: string, sn: string) => {
  //   const recoveredUsers = localStorage.getItem("activeUser_db");

  //   if (recoveredUsers) {
  //     const hasRecoveredUsers = JSON.parse(recoveredUsers);
  //     const hasUserActive = hasRecoveredUsers.filter(
  //       (employee: Employee) => employee.mat === mat
  //     );
  //     const hasCollectorActive = hasRecoveredUsers.filter(
  //       (collector: Collector) => collector.sn === sn
  //     );
  //     if (hasUserActive.length > 0 || hasCollectorActive.length > 0) {
  //       setError({
  //         hasError: true,
  //         msg: "Ops, parece que a matrícula já está cadastrada.",
  //       });
  //       return false;
  //     }
  //   }
  //   return true;
  // };

  const activatedDB = (found: Activated) => {
    const activated: Activated[] = [];
    const activateDB = localStorage.getItem("activeUsers_db");
    if (found) {
      if (activateDB) {
        const activateDBConvert = JSON.parse(activateDB);
        activated.push(...activateDBConvert, found);
        localStorage.setItem("activeUsers_db", JSON.stringify(activated));
      } else {
        activated.push(found);
        localStorage.setItem("activeUsers_db", JSON.stringify(activated));
      }
      setError({
        hasError: false,
        msg: "Ativação realizada com sucesso!",
      });
      return;
    }
  };

  const isActivated = (coll: string, emp: string): boolean => {
    const hasIsActivated = localStorage.getItem("activeUsers_db");
    if (hasIsActivated) {
      const hasIsActivatedConvert = JSON.parse(hasIsActivated);
      const hasActivated: Activated | undefined = hasIsActivatedConvert.find(
        (activated: Activated) =>
          activated.collector?.sn === coll ||
          activated.collector?.numero === Number(coll) ||
          activated.employee?.mat === emp ||
          activated.employee?.name === emp
      );
      return !!hasActivated; // Retorna true se encontrou um item, caso contrário, retorna false.
    }
    return false; // Retorna false se o localStorage estiver vazio.
  };

  const cadastrar = (coll: string, emp: string) => {
    if (coll && emp) {
      const isActivatedUSer = isActivated(coll, emp);
      if (isActivatedUSer) {
        setError({
          hasError: true,
          msg: "Usuário ou coletor já ativo, verifique novamente!",
        });
        return;
      }
      const found: Activated = {};

      const findCollector = localStorage.getItem("collector_db");
      const findEmployee = localStorage.getItem("employee_db");

      if (findCollector) {
        // const findCollectorConverter = JSON.parse(findCollector);
        const hasFindCollector = JSON.parse(findCollector);
        const wasFoundCollector: Collector = hasFindCollector.find(
          (collector: Collector) => {
            if (collector.numero === Number(coll) || collector.sn === coll) {
              collector.status = true;
              return collector;
            }
          }
        );
        found.collector = wasFoundCollector;
        // const hasFindCollectorStatus = hasFindCollector.filter(
        //   (wasFoundCollector: Collector) => {
        //     wasFoundCollector.sn !== wasFoundCollector.sn;
        //   }
        // );
        // console.log(hasFindCollectorStatus);
        // findCollectorConverter.push(hasFindCollectorStatus, "teste");

        //   let _ = localStorage.setItem(
        //     "collector_db",
        //     JSON.stringify(findCollectorConverter)
        //   );
      }

      if (findEmployee) {
        // const findEmployeeConverter = JSON.parse(findEmployee);
        const hasFindEmployee = JSON.parse(findEmployee);
        const wasFoundEmployee = hasFindEmployee.find((employee: Employee) => {
          if (employee.mat === emp || employee.name === emp) {
            employee.status = true;
            return employee;
          }
        });
        found.employee = wasFoundEmployee;
        // const hasFindEmployeeStatus = hasFindEmployee.filter(
        //   (wasFoundEmployee: Employee) => {
        //     wasFoundEmployee !== wasFoundEmployee;
        //   }
        // );
        // console.log(hasFindEmployeeStatus);
        //   findEmployeeConverter.push(hasFindEmployeeStatus, wasFoundEmployee);

        //   let _ = localStorage.setItem(
        //     "employee_db",
        //     JSON.stringify(findEmployeeConverter)
        //   );
      }

      activatedDB(found);
    }
  };

  const cadastro = async (coll: string, emp: string) => {
    setError(null);
    cadastrar(coll, emp);
  };

  const atualizarIrmao = (atualizarWithBrother: boolean) => {
    setAtualizarIrmao(atualizarWithBrother);
  };
  return (
    <ControlContext.Provider
      value={{
        error,
        setError,
        cadastro,
        atualizarIrmao,
        atualizarWithBrother,
      }}
    >
      {children}
    </ControlContext.Provider>
  );
};
