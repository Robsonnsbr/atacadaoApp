import { useState, useContext, useEffect } from "react";
// import { AuthContext } from "../../contexts/AuthContext";
import { ControlContext } from "../../contexts/ControlContext";
import {
  Button,
  ContainerField,
  Form,
  Main,
  NaveBar,
  PageContent,
  Wrapper,
} from "../../components";
import { ControlTable } from "../../components/tables";
import { motion } from "framer-motion";
// import { BiSearchAlt2 } from "react-icons/bi";
import { Collector } from "../../@types/Collector";
import { Employee } from "../../@types/Employee";
import { Activated } from "../../@types/Activated";
// import { EnumWorkShift } from "../../@types/Enums";

interface CustomError {
  hasError: boolean;
  msg: string;
}
export const ControlPage = () => {
  // const { isAuthenticated } = useContext(AuthContext);
  const { cadastro } = useContext(ControlContext);

  // const navigate = useNavigate();
  const [emp, setEmp] = useState("");
  const [coll, setColl] = useState("");
  const [atualizarFilho, setAtualizarFilho] = useState(false);
  const [atualizar, setAtualizar] = useState(false);
  const [collectors, setCollectors] = useState<Collector[] | null>([]);
  const [employees, setEmployees] = useState<Employee[] | null>([]);
  const [activeUsers, setUsuarios] = useState<Activated[] | null>([]);
  const [error, setError] = useState<CustomError | null>(null);

  const [selectedCheckboxEmployee, setSelectedCheckboxEmployee] =
    useState<string>("mat");
  const [selectedCheckboxCollector, setSelectedCheckboxCollector] =
    useState<string>("numero");

  //TODO: analisar e/ou remover todos as function and commits
  //TODO: ativar tratamento dos inputs
  // const inputsBlock = document.querySelectorAll(".block");

  // inputsBlock.forEach((element) => {
  //   const preventDefault = (e: Event) => e.preventDefault();

  //   element.addEventListener("paste", preventDefault);
  //   element.addEventListener("copy", preventDefault);
  //   element.addEventListener("cut", preventDefault);
  // });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(), cadastro(emp, coll);
  };
  //TODO: fix CustomValidity for React obs:(após o 2 elemento ele persiste o erro)
  // useEffect(() => {
  //   const fields = document.querySelectorAll("[required]");

  //   const customValidation = (e: Event) => {
  //     e.preventDefault();
  //     const field = e.target as HTMLInputElement;

  //     if (field.validity.valueMissing) {
  //       field.setCustomValidity("Esse campo é obrigatório");
  //     } else if (field.validity.customError) {
  //       field.setCustomValidity("Houve um erro personalizado no campo");
  //     } else {
  //       field.setCustomValidity(""); // Limpa a mensagem de erro personalizada
  //     }
  //   };

  //   for (const field of fields) {
  //     field.addEventListener("invalid", customValidation);
  //   }

  //   return () => {
  //     for (const field of fields) {
  //       field.removeEventListener("invalid", customValidation);
  //     }
  //   };
  // }, []);

  const warningElement = document.getElementById("warning")!;

  // useEffect(() => {
  //   const recuperarUsers = () => {
  //     const EmpTeste = {
  //       employee: "robson monteiro	646469797	não informado",
  //       collector: "65	65 12345678901234567",
  //       status: "ATIVO",
  //     };
  //     localStorage.setItem("activeUsers_db", JSON.stringify(EmpTeste));
  //   };
  //   console.log("entrei aqui2");
  //   recuperarUsers();
  // }, []);

  // useEffect(() => {
  //   setAtualizarFilho(!atualizarFilho); // TODO: apagar
  //   console.log("entrei aqui1");
  // }, []);

  useEffect(() => {
    const handleWarning = () => {
      if (error !== null) {
        warningElement?.classList.remove("warning-null");
        if (!error.hasError) {
          warningElement?.classList.remove("error-true");
          warningElement?.classList.add("error-false");
          handleClearInput();
        } else {
          warningElement?.classList.remove("error-false");
          warningElement?.classList.add("error-true");
        }
        setTimeout(() => {
          warningElement?.classList.add("warning-null");
          warningElement?.classList.remove("error-false");
          warningElement?.classList.remove("error-true");
        }, 4000);
      }
      return;
    };
    handleWarning();
  }, [warningElement, error]);

  //   const recuperarUsers = () => {
  //     const recoveredUsers = localStorage.setItem(
  //       "activeUsers_db",
  //       JSON.stringify(employee, collector)
  //     );
  //     if (recoveredUsers) {
  //       const hasRecoveredUsers = JSON.parse(recoveredUsers);
  //       const orderHasRecoveredUsers = hasRecoveredUsers.sort(
  //         (a: Collector, b: Collector) => a.numero - b.numero
  //       );
  //       if (hasRecoveredUsers && hasRecoveredUsers)
  //         setCollectors(orderHasRecoveredUsers);
  //     }
  //   };
  //   recuperarUsers();
  // }, []);

  useEffect(() => {
    const recuperarUsers = () => {
      const recoveredUsers = localStorage.getItem("collector_db");
      if (recoveredUsers) {
        const hasRecoveredUsers = JSON.parse(recoveredUsers);
        const orderHasRecoveredUsers = hasRecoveredUsers.sort(
          (a: Collector, b: Collector) => a.numero - b.numero
        );
        if (hasRecoveredUsers && hasRecoveredUsers)
          setCollectors(orderHasRecoveredUsers);
      }
    };
    recuperarUsers();
  }, []);

  useEffect(() => {
    const recuperarUsers = () => {
      const recoveredUsers = localStorage.getItem("employee_db");
      if (recoveredUsers) {
        const hasRecoveredUsers = JSON.parse(recoveredUsers);

        // Ordenar hasRecoveredUsers com base na propriedade 'name'
        hasRecoveredUsers.sort((a: Employee, b: Employee) => {
          if (a.name && b.name) {
            return a.name.localeCompare(b.name);
          }
          return 0; // Ou outra lógica de tratamento se algum deles não tiver name
        });

        setEmployees(hasRecoveredUsers);
      }
    };
    recuperarUsers();
  }, []);

  // const activeUsersTest: Activated[] = [
  //   {
  //     collector: { num: "65", sn: "10012931023910239", status: true },
  //     employee: {
  //       name: "Robson Monteiro",
  //       mat: "50505011",
  //       workShift: EnumWorkShift.HIBRIDO,
  //       status: true,
  //     },
  //   },
  //   {
  //     collector: { num: "30", sn: "1231231511023910239", status: true },
  //     employee: {
  //       name: "Teste@teste",
  //       mat: "44555151",
  //       workShift: EnumWorkShift.MANHA,
  //       status: true,
  //     },
  //   },
  //   {
  //     collector: { num: "41", sn: "515166111023910239", status: true },
  //     employee: {
  //       name: "Teste@teste2",
  //       mat: "83512151",
  //       workShift: EnumWorkShift.NOITE,
  //       status: true,
  //     },
  //   },
  //   {
  //     collector: { num: "44", sn: "45718883323910239", status: true },
  //     employee: {
  //       name: "Teste@teste3",
  //       mat: "616165151",
  //       workShift: EnumWorkShift.HIBRIDO,
  //       status: true,
  //     },
  //   },
  //   {
  //     collector: { num: "47", sn: "51515566615114242", status: true },
  //     employee: {
  //       name: "Teste@teste4",
  //       mat: "88765151",
  //       workShift: EnumWorkShift.TARDE,
  //       status: true,
  //     },
  //   },
  //   {
  //     collector: { num: "33", sn: "012390006615114242", status: true },
  //     employee: {
  //       name: "Teste@teste5",
  //       mat: "99995151",
  //       workShift: EnumWorkShift.MANHA,
  //       status: true,
  //     },
  //   },
  // ];

  useEffect(() => {
    const recoveredActivated = localStorage.getItem("activeUsers_db");
    if (recoveredActivated) {
      const recoveredActivatedConvert = JSON.parse(recoveredActivated);
      setUsuarios(recoveredActivatedConvert);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setAtualizar(!atualizar);
  }, []);
  // useEffect(() => {
  //   const recuperarUsers = () => {
  //     const recoveredActiveUser = localStorage.getItem("activeUsers_db");
  //     if (recoveredActiveUser) {
  //       const hasRecoveredActiveUser = JSON.parse(recoveredActiveUser);
  //       const orderHasRecoveredUsers = hasRecoveredUsers.sort(
  //         (a: Collector, b: Collector) => a.numero - b.numero
  //       );
  //       if (hasRecoveredUsers && hasRecoveredUsers)
  //         setCollectors(orderHasRecoveredUsers);
  //     }
  //   };
  //   recuperarUsers();
  // }, []);

  const atualizarUseEffectFilho = () => {
    setAtualizarFilho(!atualizarFilho);
  };

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
    }
  };

  const isActivated = (coll: string, Emp: string) => {
    // console.log("entrei aqui");
    const hasIsActivated = localStorage.getItem("activeUsers_db");
    if (hasIsActivated) {
      const hasIsActivatedConvert = JSON.parse(hasIsActivated);
      const hasActivated = hasIsActivatedConvert.find(
        (activated: Activated) => {
          if (
            activated.collector?.sn === coll ||
            activated.collector?.numero === Number(coll) ||
            activated.employee?.mat === Emp ||
            activated.employee?.name === Emp
          ) {
            return true;
          } else {
            return false;
          }
        }
      );
      console.log(hasActivated);
      return hasActivated;
    }
  };

  const findActivate = (coll: string, Emp: string) => {
    if (coll && Emp) {
      // console.log(isActivated(coll, Emp));
      if (isActivated(coll, Emp)) {
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
          if (employee.mat === Emp || employee.name === Emp) {
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
      atualizarUseEffectFilho();
    }
  };

  const handleClearInput = () => {
    setEmp("");
    setColl("");
    document.getElementById("#SearchSN")?.focus();
  };

  const handleCheckboxChangeCollector = (value: string = "numero") => {
    setSelectedCheckboxCollector(value);
  };

  const handleCheckboxChangeEmployee = (value: string = "mat") => {
    setSelectedCheckboxEmployee(value);
  };

  // const handleToggleSearch = (sn: string) => {
  //   console.log("Buscar Item! sn: ", sn);
  // };

  // const usuario: User = { name, sn, password };
  // if (isAuthenticated) {
  //   navigate("/");
  // }

  const containerMotion = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerDirection: -1,
      },
    },
  };

  return (
    <PageContent>
      <NaveBar />
      <motion.div variants={containerMotion} initial="hidden" animate="show">
        <Main>
          <Wrapper>
            <div className="containerCadastro">
              <h1>ATIVAR COLABORADOR</h1>
              <Form onSubmit={(e) => handleSubmit(e)} method={"post"}>
                {/* TODO: add icon/imagem buscador nos inputs  e add logica*/}
                {/* TODO: FIX add icon do react-icons aqui  e alterar o da pagina cadastro usuários que está com um ícone externo */}

                <label htmlFor="SearchSN">
                  BUSCAR POR NÚMERO OU SERIAL DO COLETOR
                </label>
                <div className="checkBox">
                  <label htmlFor="numeroCheckbox">Número:</label>
                  <input
                    style={{ background: "red" }}
                    type="checkbox"
                    id="numeroCheckbox"
                    name="opcao"
                    value="numero"
                    onChange={() => handleCheckboxChangeCollector("numero")}
                    checked={selectedCheckboxCollector === "numero"}
                  />
                  <label htmlFor="snCheckbox">SN:</label>
                  <input
                    type="checkbox"
                    id="snCheckbox"
                    name="opcao"
                    value="sn"
                    onChange={() => handleCheckboxChangeCollector("sn")}
                    checked={selectedCheckboxCollector === "sn"}
                  />
                </div>
                <ContainerField className="inputSN">
                  <div
                    style={{
                      maxWidth: "310px",
                      maxHeight: "39.2px",
                    }}
                  >
                    <select
                      autoFocus
                      className="block"
                      id="SearchSN"
                      // value={sn}
                      // placeholder="número | serial"
                      onChange={(event) => setColl(event.target.value)}
                      required
                      title="aaaaa"
                    >
                      <option value="">selecione um coletor</option>
                      {selectedCheckboxCollector === "numero" &&
                        collectors?.map((collector, index) => (
                          <option key={index}>{`${collector.numero}
                        `}</option>
                        ))}
                      {selectedCheckboxCollector === "sn" &&
                        collectors?.map((collector, index) => (
                          <option key={index}>{`${collector.sn}
                        `}</option>
                        ))}
                    </select>
                    {/* 
                    <button
                      className="btnViewPassword"
                      type="button"
                      onClick={() => handleToggleSearch(sn)}
                    >
                      <BiSearchAlt2 />
                    </button> */}
                  </div>
                </ContainerField>

                <label htmlFor="SearchNum">
                  BUSCAR POR MATRÍCULA OU NOME DO COLABORADOR
                </label>
                <div className="checkBox">
                  <label htmlFor="numeroCheckbox">Matrícula:</label>
                  <input
                    className="inputsControls"
                    type="checkbox"
                    id="numeroCheckbox"
                    name="opcao"
                    value="mat"
                    onChange={() => handleCheckboxChangeEmployee("mat")}
                    checked={selectedCheckboxEmployee === "mat"}
                  />
                  <label htmlFor="snCheckbox">Nome:</label>
                  <input
                    className="inputsControls"
                    type="checkbox"
                    id="snCheckbox"
                    name="opcao"
                    value="name"
                    onChange={() => handleCheckboxChangeEmployee("name")}
                    checked={selectedCheckboxEmployee === "name"}
                  />
                </div>
                <ContainerField className="inputSN">
                  <div
                    style={{
                      maxWidth: "310px",
                      maxHeight: "39.2px",
                    }}
                  >
                    <select
                      autoFocus
                      className="block"
                      id="SearchNum"
                      // value={numero}
                      // placeholder="número | serial"
                      onChange={(event) => setEmp(event.target.value)}
                      required
                      title="aaaaa"
                      style={{ maxWidth: "308px" }}
                    >
                      <option value="">selecione um colaborador</option>
                      {selectedCheckboxEmployee === "mat" &&
                        employees?.map((employee, index) => (
                          <option key={index}>{`${employee.mat}
                        `}</option>
                        ))}
                      {selectedCheckboxEmployee === "name" &&
                        employees?.map((employee, index) => (
                          <option key={index}>{`${employee.name} 
                        `}</option>
                        ))}
                    </select>
                    {/* <button
                      className="btnViewPassword"
                      type="button"
                      onClick={() => handleToggleSearch(sn)}
                    >
                      <BiSearchAlt2 />
                    </button> */}
                  </div>
                </ContainerField>
                <Button
                  backgroundcolor="var(--successfully)"
                  type={"submit"}
                  id={"btnSubmit"}
                  name={"btnSubmit"}
                  value={"ATIVAR"}
                  onClick={() => findActivate(coll, emp)}
                />
              </Form>
              <p id="warning" className="warning-null">
                {error?.msg || "null"}
              </p>
            </div>
            <div>
              <ControlTable
                atualizar={atualizarFilho}
                activeUsers={activeUsers}
              />

              {activeUsers && (
                <div style={{ textAlign: "center", margin: "5px" }}>
                  {employees && (
                    <span>
                      Colaboradores offline:{" "}
                      {employees?.length - activeUsers?.length}
                    </span>
                  )}
                  {collectors && (
                    <span>
                      {" "}
                      Coletores offline:{" "}
                      {collectors?.length - activeUsers?.length}
                    </span>
                  )}

                  {activeUsers && (
                    <span> Total ativos: {activeUsers?.length}</span>
                  )}
                </div>
              )}
            </div>
          </Wrapper>
        </Main>
      </motion.div>
    </PageContent>
  );
};
