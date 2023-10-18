import { useState, useContext, useEffect } from "react";
// import { AuthContext } from "../../contexts/AuthContext";
import { CadastroContext } from "../../../contexts/CadastroContext";
import {
  Button,
  ContainerField,
  Form,
  Main,
  NaveBar,
  PageContent,
  Wrapper,
} from "../../../components";
import { TabelaFuncionarios } from "../../../components/tables/userTable/UserTable";
import hide from "../../../assets/iconButtonPassword/hide.png";
import show from "../../../assets/iconButtonPassword/show.png";

export const CadastroUser = () => {
  // const { isAuthenticated } = useContext(AuthContext);
  const { cadastro, error } = useContext(CadastroContext);

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

  const inputsBlock = document.querySelectorAll(".block");

  inputsBlock.forEach((element) => {
    const preventDefault = (e: Event) => e.preventDefault();

    element.addEventListener("paste", preventDefault);
    element.addEventListener("copy", preventDefault);
    element.addEventListener("cut", preventDefault);
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(),
      cadastro(name, mat, confirmMat, password, confirmPassword, CPF);
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

  return (
    <PageContent>
      <NaveBar />
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
                  value={name.toLowerCase()}
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
                  value={mat.toLowerCase()}
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
                  value={confirmMat.toLowerCase()}
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
                  value={CPF}
                  onChange={(event) => handleChangeCPF(event)}
                  maxLength={14}
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
                    onChange={(event) => setConfirmPassword(event.target.value)}
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
          <TabelaFuncionarios atualizar={atualizarFilho} />
        </Wrapper>
      </Main>
    </PageContent>
  );
};
