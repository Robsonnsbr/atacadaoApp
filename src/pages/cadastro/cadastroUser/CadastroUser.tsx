import { useState, useContext } from "react";
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
    element.addEventListener("paste", (e) => {
      e.preventDefault();
    });
    element.addEventListener("copy", (e) => {
      e.preventDefault();
    });
    element.addEventListener("cut", (e) => {
      e.preventDefault();
    });
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(),
      cadastro(name, mat, confirmEmail, password, confirmPassword);
  };

  const [atualizarFilho, setAtualizarFilho] = useState(false);

  const atualizarUseEffectFilho = () => {
    setAtualizarFilho(!atualizarFilho);
    console.log("atualizei");
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
              <ContainerField>
                <label htmlFor="mat">Nome:</label>
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
                />
              </ContainerField>
              <ContainerField>
                <label htmlFor="mat">Matricula:</label>
                <input
                  autoFocus
                  className="block"
                  autoComplete="nope"
                  type="text"
                  id="mat"
                  placeholder="matricula"
                  value={mat.toLowerCase()}
                  onChange={(event) => setMat(event.target.value)}
                  required
                />
              </ContainerField>
              <ContainerField>
                <label htmlFor="confirmarMat">Confirmar matricula:</label>
                <input
                  className="block"
                  autoComplete="nope"
                  type="text"
                  id="confirmarMat"
                  placeholder="confirmar matricula"
                  value={confirmEmail.toLowerCase()}
                  onChange={(event) => setConfirmEmail(event.target.value)}
                  required
                />
              </ContainerField>
              <ContainerField>
                <label htmlFor="password">Senha:</label>
                <input
                  className="block"
                  type="password"
                  name="password"
                  id="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="confirmar senha"
                  required
                />
              </ContainerField>
              <ContainerField>
                <label htmlFor="confirmarPassword">Confirmar senha:</label>
                <input
                  className="block"
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
                backgroundcolor="var(--buttonEnter)"
                type={"submit"}
                id={"btnSubmit"}
                name={"btnSubmit"}
                value={"Cadastrar"}
                onClick={atualizarUseEffectFilho}
              />
            </Form>

            {!error && (
              <p style={{ color: "transparent", marginBottom: "5px" }}>
                #gambiarra#
              </p>
            )}
            {error && (
              <p style={{ color: "var(--error)", marginBottom: "5px" }}>
                {error}
              </p>
            )}
          </div>
          <TabelaFuncionarios atualizar={atualizarFilho} />
        </Wrapper>
      </Main>
    </PageContent>
  );
};
