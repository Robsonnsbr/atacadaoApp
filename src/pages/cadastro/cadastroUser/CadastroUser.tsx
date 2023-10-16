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

export const CadastroUser = () => {
  // const { isAuthenticated } = useContext(AuthContext);
  const { cadastro, error } = useContext(CadastroContext);

  // const navigate = useNavigate();
  const [name, setName] = useState("");
  const [mat, setMat] = useState("");
  const [confirmMat, setConfirmMat] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const inputsBlock = document.querySelectorAll(".block");

  inputsBlock.forEach((element) => {
    const preventDefault = (e: Event) => e.preventDefault();

    element.addEventListener("paste", preventDefault);
    element.addEventListener("copy", preventDefault);
    element.addEventListener("cut", preventDefault);
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(),
      cadastro(name, mat, confirmMat, password, confirmPassword);
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

  const [atualizarFilho, setAtualizarFilho] = useState(false);

  const atualizarUseEffectFilho = () => {
    setAtualizarFilho(!atualizarFilho);
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
              <label htmlFor="password">SENHA DO USUÁRIO</label>
              <ContainerField>
                <input
                  className="block"
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  placeholder="senha"
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </ContainerField>
              <ContainerField className="inputPass">
                <input
                  className="block"
                  type="password"
                  name="confirmarPassword"
                  id="confirmarPassword"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="confirmar senha"
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
          <TabelaFuncionarios atualizar={atualizarFilho} />
        </Wrapper>
      </Main>
    </PageContent>
  );
};
