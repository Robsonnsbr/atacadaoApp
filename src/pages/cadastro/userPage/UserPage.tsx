import { useState, useContext, useEffect } from "react";
// import { AuthContext } from "../../contexts/AuthContext";
import { CadastroUserContext } from "../../../contexts/CadastroUserContext";
import {
  Button,
  ContainerField,
  Form,
  Main,
  NaveBar,
  PageContent,
  Wrapper,
} from "../../../components";
import { UserTable } from "../../../components/tables";
import hide from "../../../assets/iconButtonPassword/hide.png";
import show from "../../../assets/iconButtonPassword/show.png";
import { motion } from "framer-motion";

export const UserPage = () => {
  // const { isAuthenticated } = useContext(AuthContext);
  const { cadastro, error } = useContext(CadastroUserContext);

  // const navigate = useNavigate();
  const [name, setName] = useState("");
  const [mat, setMat] = useState("");
  const [confirmMat, setConfirmMat] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [CPF, setCPF] = useState("");
  const [atualizarFilho, setAtualizarFilho] = useState(false);
  const [mostrarSenha1, setMostrarSenha1] = useState(false);
  const [mostrarSenha2, setMostrarSenha2] = useState(false);

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
    event.preventDefault(),
      cadastro(
        name,
        mat,
        confirmMat,
        password,
        confirmPassword,
        CPF.replace(/\D/g, "")
      );
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

  const atualizarUseEffectFilho = () => {
    setAtualizarFilho(!atualizarFilho);
  };

  const handleClearInput = () => {
    setName("");
    setMat("");
    setConfirmMat("");
    setPassword("");
    setConfirmPassword("");
    setCPF("");
    document.getElementById("name")?.focus();
  };

  // const formatarCPF = (value: string) => {
  //   // Função para formatar o CPF
  //   // Implemente a lógica de formatação aqui, se necessário
  //   // Exemplo simples:
  //   const cpfFormatado = value
  //     .replace(/\D/g, "")
  //     .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  //   console.log(cpfFormatado);
  //   return cpfFormatado;
  // };

  const formatarCPF = (value: string) => {
    const cpfDigits = value.replace(/\D/g, "");
    let cpfFormatado = cpfDigits;

    if (cpfDigits.length >= 3) {
      cpfFormatado = cpfDigits.substring(0, 3) + "." + cpfDigits.substring(3);
    }
    if (cpfDigits.length >= 6) {
      cpfFormatado =
        cpfFormatado.substring(0, 7) + "." + cpfDigits.substring(6);
    }
    if (cpfDigits.length >= 9) {
      cpfFormatado =
        cpfFormatado.substring(0, 11) + "-" + cpfDigits.substring(9);
    }

    return cpfFormatado;
  };

  const handleChangeCPF = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const cpfFormatado = formatarCPF(value);
    setCPF(cpfFormatado);
  };

  const handleToggleSenha = (value: string) => {
    if (value === "btn1") {
      setMostrarSenha1(!mostrarSenha1);
      return;
    }
    if (value === "btn2") {
      setMostrarSenha2(!mostrarSenha2);
      return;
    }
  };

  // const usuario: User = { name, mat, password };
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
              <h1>CADASTRO DE USUÁRIOS</h1>
              <Form onSubmit={(e) => handleSubmit(e)} method={"post"}>
                <label htmlFor="name">NOME DO USUÁRIO</label>
                <ContainerField className="inputName">
                  <input
                    autoFocus
                    className="block"
                    autoComplete="nope"
                    type="text"
                    id="name"
                    placeholder="nome"
                    maxLength={30}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    title="aaaaa"
                  />
                </ContainerField>
                <label htmlFor="mat">MATRÍCULA DO USUÁRIO</label>
                <ContainerField>
                  <input
                    className="block"
                    autoComplete="nope"
                    type="text"
                    id="mat"
                    placeholder="matrícula"
                    maxLength={20}
                    value={mat.toLowerCase().replace(/\s+/g, "")}
                    onChange={(event) => setMat(event.target.value)}
                    required
                  />
                </ContainerField>
                <ContainerField className="inputMat">
                  <input
                    className="block"
                    autoComplete="nope"
                    type="text"
                    id="confirmarMat"
                    placeholder="confirmar matrícula"
                    maxLength={20}
                    value={confirmMat.toLowerCase().replace(/\s+/g, "")}
                    onChange={(event) => setConfirmMat(event.target.value)}
                    required
                  />
                </ContainerField>
                <label htmlFor="CPF">CPF</label>
                <ContainerField className="inputCPF">
                  <input
                    className="block"
                    autoComplete="off"
                    type="text"
                    id="CPF"
                    placeholder="CPF"
                    maxLength={14}
                    value={CPF}
                    onChange={(event) => handleChangeCPF(event)}
                    required
                  />
                </ContainerField>
                <label htmlFor="password">SENHA DO USUÁRIO</label>
                <ContainerField>
                  <div
                    style={{
                      maxWidth: "310px",
                      maxHeight: "39.2px",
                    }}
                  >
                    <input
                      className="block"
                      type={mostrarSenha1 ? "text" : "password"}
                      name="password"
                      id="password"
                      value={password}
                      maxLength={20}
                      placeholder="senha"
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                    <button
                      className="btnViewPassword"
                      type="button"
                      onClick={() => handleToggleSenha("btn1")}
                    >
                      {mostrarSenha1 ? (
                        <img src={hide} alt="Ocultar Senha" />
                      ) : (
                        <img src={show} alt="Mostrar Senha" />
                      )}
                    </button>
                  </div>
                </ContainerField>
                <ContainerField className="inputPass">
                  <div
                    style={{
                      maxWidth: "310px",
                      maxHeight: "39.2px",
                    }}
                  >
                    <input
                      className="block"
                      type={mostrarSenha2 ? "text" : "password"}
                      name="confirmarPassword"
                      id="confirmarPassword"
                      value={confirmPassword}
                      maxLength={20}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      placeholder="confirmar senha"
                      required
                    />
                    <button
                      className="btnViewPassword"
                      type="button"
                      onClick={() => handleToggleSenha("btn2")}
                    >
                      {mostrarSenha2 ? (
                        <img src={hide} alt="Ocultar Senha" />
                      ) : (
                        <img src={show} alt="Mostrar Senha" />
                      )}
                    </button>
                  </div>
                </ContainerField>

                <Button
                  backgroundcolor="var(--successfully)"
                  type={"submit"}
                  id={"btnSubmit"}
                  name={"btnSubmit"}
                  value={"Cadastrar"}
                  onClick={atualizarUseEffectFilho}
                />
              </Form>
              <p id="warning" className="warning-null">
                {error?.msg || "null"}
              </p>
            </div>
            <UserTable atualizar={atualizarFilho} />
          </Wrapper>
        </Main>
      </motion.div>
    </PageContent>
  );
};
