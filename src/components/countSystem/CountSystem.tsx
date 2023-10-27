import { useContext, useEffect, useState } from "react";
import { Activated } from "../../@types/Activated";
import { Collector } from "../../@types/Collector";
import { Employee } from "../../@types/Employee";
import { ControlContext } from "../../contexts/ControlContext";

interface IPropsCountSystem {
  atualizar: boolean;
  employees: Employee[] | null;
  collectors: Collector[] | null;
}

export const CountSystem = ({
  atualizar,
  employees,
  collectors,
}: IPropsCountSystem) => {
  const [atualizarInterno, setAtualizarInterno] = useState(atualizar);
  const [activeUsers, setActiveU] = useState<Activated[] | null>([]);
  const { atualizarWithBrother } = useContext(ControlContext);
  // const [collectors, setCollectors] = useState<Collector[] | null>([]);
  // const [employees, setEmployees] = useState<Employee[] | null>([]);

  useEffect(() => {
    const recoveredActivated = localStorage.getItem("activeUsers_db");
    if (recoveredActivated) {
      const recoveredActivatedConvert = JSON.parse(recoveredActivated);
      setActiveU(recoveredActivatedConvert);
    }
    setAtualizarInterno(atualizar);
    // setCollectors(collectors);
    // setEmployees(employees);
    // console.log(activeUsers?.length);
  }, [atualizar, atualizarWithBrother, atualizarInterno]);
  return (
    <>
      {activeUsers && employees && collectors && (
        <div style={{ textAlign: "center", margin: "5px" }}>
          <span>
            Colaboradores offline: {employees?.length - activeUsers?.length}
          </span>
          <span>
            {" "}
            Coletores offline: {collectors?.length - activeUsers?.length}
          </span>
          <span> Total ativos: {activeUsers?.length}</span>
        </div>
      )}
    </>
  );
};
