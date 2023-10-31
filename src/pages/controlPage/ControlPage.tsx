import { useState, useContext, useEffect } from "react";
// import { AuthContext } from "../../contexts/AuthContext";
import { ControlContext } from "../../contexts/ControlContext";
import {
  Button,
  ContainerField,
  CountSystem,
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

// interface CustomError {
//   hasError: boolean;
//   msg: string;
// }
export const ControlPage = () => {
  // const { isAuthenticated } = useContext(AuthContext);
  const { cadastro, setError, error } = useContext(ControlContext);

  // const navigate = useNavigate();
  const [emp, setEmp] = useState("");
  const [coll, setColl] = useState("");
  const [atualizarFilho, setAtualizarFilho] = useState(false);
  const [atualizar, setAtualizar] = useState(false);
  const [collectors, setCollectors] = useState<Collector[] | null>([]);
  const [employees, setEmployees] = useState<Employee[] | null>([]);
  const [activeUsers, setUsuarios] = useState<Activated[] | null>([]);
  const [atualizarInterno, setAtualizarInterno] = useState(atualizar);
  // const [error, setError] = useState<CustomError | null>(null);

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
  const handleClearInput = () => {
    setEmp(""); // Redefine o estado emp para uma string vazia
    setColl("");
    document.getElementById("SearchSN")?.focus();

    // Obtenha o elemento select pelo ID
    const selectElements = document.querySelectorAll("select");

    // Agora selectElements é uma NodeList contendo todos os elementos select no documento

    // Para limpar todos os campos select:
    selectElements.forEach((selectElement) => {
      selectElement.value = ""; // Define o valor de cada campo select como uma string vazia
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(), cadastro(coll, emp);

    setAtualizarFilho(!atualizarFilho);
    setAtualizarInterno(atualizarInterno);
  };

  const warningElement = document.getElementById("warning")!;

  useEffect(() => {
    // Atualize o estado atualizarInterno quando a prop atualizar mudar
    setAtualizarInterno(atualizar);
    setError(null);
  }, [atualizar]);

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
    atualizarUseEffectFilho();
  }, []);

  const atualizarUseEffectFilho = () => {
    return {};
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
                  onClick={atualizarUseEffectFilho}
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

              <CountSystem
                atualizar={atualizarFilho}
                employees={employees}
                collectors={collectors}
              />
            </div>
          </Wrapper>
        </Main>
      </motion.div>
    </PageContent>
  );
};
