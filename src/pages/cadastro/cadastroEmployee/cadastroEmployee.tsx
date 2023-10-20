import { useState, useContext, useEffect } from "react";
// import { AuthContext } from "../../contexts/AuthContext";
import { CadastroEmpContext } from "../../../contexts/CadastroEmpContext";
import {
  Button,
  ContainerField,
  Form,
  Main,
  NaveBar,
  PageContent,
  Wrapper,
} from "../../../components";
import { EmployeeTable } from "../../../components/tables/Table/Employee/EmployeeTable";

export const CadastroEmployee = () => {
  // const { isAuthenticated } = useContext(AuthContext);
  const { cadastro, error } = useContext(CadastroEmpContext);

  // const navigate = useNavigate();
  const [name, setName] = useState("");
  const [mat, setMat] = useState("");
  const [confirmMat, setConfirmMat] = useState("");
  const [atualizarFilho, setAtualizarFilho] = useState(false);

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
    event.preventDefault(), cadastro(name, mat, confirmMat);
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
            <h1>CADASTRO DE FUNCIONÁRIOS</h1>
            <Form onSubmit={(e) => handleSubmit(e)} method={"post"}>
              <label htmlFor="name">NOME DO FUNCIONÁRIO</label>
              <ContainerField className="inputName">
                <input
                  autoFocus
                  className="block"
                  autoComplete="nope"
                  type="text"
                  id="name"
                  placeholder="nome"
                  maxLength={30}
                  value={name.toLowerCase()}
                  onChange={(event) => setName(event.target.value)}
                  required
                  title="aaaaa"
                />
              </ContainerField>
              <label htmlFor="mat">MATRÍCULA DO FUNCIONÁRIO</label>
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
          <EmployeeTable atualizar={atualizarFilho} />
        </Wrapper>
      </Main>
    </PageContent>
  );
};
