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
import { EnumWorkShift } from "../../@types/Enums";
export const ControlPage = () => {
  // const { isAuthenticated } = useContext(AuthContext);
  const { cadastro, error } = useContext(ControlContext);

  // const navigate = useNavigate();
  const [mat, setMat] = useState("");
  const [sn, setSN] = useState("");
  const [atualizarFilho, setAtualizarFilho] = useState(false);
  const [collectors, setCollectors] = useState<Collector[] | null>([]);
  const [employees, setEmployees] = useState<Employee[] | null>([]);
  const [activeUsers, setUsuarios] = useState<Activated[] | null>([]);

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
    event.preventDefault(), cadastro(mat, sn);
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
        setEmployees(hasRecoveredUsers.reverse());
      }
    };
    recuperarUsers();
  }, []);

  const activeUsersTest: Activated[] = [
    {
      collector: { num: "65", sn: "10012931023910239", status: true },
      employee: {
        name: "Robson Monteiro",
        mat: "50505011",
        workShift: EnumWorkShift.HIBRIDO,
        status: true,
      },
    },
    {
      collector: { num: "30", sn: "1231231511023910239", status: true },
      employee: {
        name: "Teste@teste",
        mat: "44555151",
        workShift: EnumWorkShift.MANHA,
        status: true,
      },
    },
    {
      collector: { num: "41", sn: "515166111023910239", status: true },
      employee: {
        name: "Teste@teste2",
        mat: "83512151",
        workShift: EnumWorkShift.NOITE,
        status: true,
      },
    },
    {
      collector: { num: "44", sn: "45718883323910239", status: true },
      employee: {
        name: "Teste@teste3",
        mat: "616165151",
        workShift: EnumWorkShift.HIBRIDO,
        status: true,
      },
    },
    {
      collector: { num: "47", sn: "51515566615114242", status: true },
      employee: {
        name: "Teste@teste4",
        mat: "88765151",
        workShift: EnumWorkShift.TARDE,
        status: true,
      },
    },
    {
      collector: { num: "33", sn: "012390006615114242", status: true },
      employee: {
        name: "Teste@teste5",
        mat: "99995151",
        workShift: EnumWorkShift.MANHA,
        status: true,
      },
    },
  ];

  useEffect(() => {
    setUsuarios(activeUsersTest);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleClearInput = () => {
    setMat("");
    setSN("");
    document.getElementById("#SearchSN")?.focus();
  };

  const getFirstName = (name: string = "") => {
    // Divida o nome completo em palavras
    const words = name.split(" ");

    // Pegue a primeira palavra (primeiro nome)
    if (words.length > 0) {
      return words[0];
    }

    // Se o nome não tiver nenhuma palavra, retorne uma string vazia
    return "";
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
                <label htmlFor="SearchSN">NÚMERO OU SERIAL DO COLETOR</label>
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
                      onChange={(event) => setSN(event.target.value)}
                      required
                      title="aaaaa"
                    >
                      <option value="">selecione um coletor</option>
                      {collectors?.map((collector, index) => (
                        <option
                          key={index}
                        >{`Num: ${collector.numero} SN:${collector.sn}
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
                  MATRÍCULA OU NOME DO COLABORADOR
                </label>
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
                      onChange={(event) => setMat(event.target.value)}
                      required
                      title="aaaaa"
                      style={{ maxWidth: "308px" }}
                    >
                      <option value="">selecione um colaborador</option>
                      {employees?.map((employee, index) => (
                        <option key={index}>{`${getFirstName(
                          employee.name
                        )} MAT: ${employee.mat} T: ${employee.workShift}
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
              {activeUsers && (
                <div style={{ textAlign: "center", margin: "5px" }}>
                  <span>Total ativos: {activeUsers?.length}</span>
                  <span> colaboradores offline: 4</span>
                  <span> Coletores offline: 15</span>
                </div>
              )}
            </div>
          </Wrapper>
        </Main>
      </motion.div>
    </PageContent>
  );
};