import { useState, useContext } from "react";
// import { AuthContext } from "../../../contexts/AuthContext";
import { CadastroContext } from "../../../contexts/CadastroContext";
import {
  Button,
  ContainerField,
  Form,
  Main,
  NaveBar,
  PageContent,
  Slink,
  Wrapper,
} from "../../../components";
import { Link } from "react-router-dom";

export const CadastroEmployee = () => {
  // const { isAuthenticated } = useContext(AuthContext);
  const { cadastro, error } = useContext(CadastroContext);

  // const navigate = useNavigate();
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
      cadastro(name, mat, confirmMat, password, confirmPassword);
  };

  // if (isAuthenticated) {
  //   navigate("/");
  // }

  return (
    <PageContent>
      <NaveBar />
      <Main>
        <Wrapper>
          <h1>CADASTRO DE FUNCIONÁRIOS</h1>
          <Form onSubmit={(e) => handleSubmit(e)} method={"post"}>
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
              backgroundcolor="var(--successfully)"
              type={"submit"}
              id={"btnSubmit"}
              name={"btnSubmit"}
              value={"Cadastrar"}
            />
          </Form>

          {!error && <span style={{ color: "transparent" }}>#gambiarra#</span>}
          {error && <span style={{ color: "var(--error)" }}>{error}</span>}
          <Link to={"/AppCollector/Login"} style={{ textDecoration: "none" }}>
            <Slink value={"log in"} />
          </Link>
        </Wrapper>
      </Main>
    </PageContent>
  );
};
