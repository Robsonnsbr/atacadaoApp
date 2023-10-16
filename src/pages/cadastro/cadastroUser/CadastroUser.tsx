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
  const [password, setPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
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
      cadastro(name, mat, confirmEmail, password, confirmPassword);
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
        }, 3000);
      }
      return;
    };
    handleWarning();
  }, [warningElement, error]);

  // console.log(warningElement);

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
          <div>
            <h1>CADASTRO DE USUÁRIOS</h1>
            <Form onSubmit={(e) => handleSubmit(e)} method={"post"}>
              <label htmlFor="name">Nome do usuário</label>
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
              <label htmlFor="mat">Matrícula do usuário</label>
              <ContainerField>
                <input
                  className="block "
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
                  className="block "
                  autoComplete="nope"
                  type="text"
                  id="confirmarMat"
                  placeholder="confirmar matrícula"
                  value={confirmEmail.toLowerCase()}
                  onChange={(event) => setConfirmEmail(event.target.value)}
                  required
                />
              </ContainerField>
              <label htmlFor="password">Senha do usuário</label>
              <ContainerField>
                <input
                  className="block "
                  type="password"
                  name="password"
                  id="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="confirmar senha"
                  required
                />
              </ContainerField>
              <ContainerField className="inputPass">
                <input
                  className="block "
                  type="password"
                  name="confirmarPassword"
                  id="confirmarPassword"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="senha"
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
