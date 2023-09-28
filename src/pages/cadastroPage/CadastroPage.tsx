import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { CadastroContext } from "../../contexts/CadastroContext";
import {
  Button,
  ContainerField,
  Form,
  Page,
  Slink,
  Wrapper,
} from "../../components";
import { Link, useNavigate } from "react-router-dom";

export const CadastroPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { cadastro, error } = useContext(CadastroContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
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
      cadastro(email, confirmEmail, password, confirmPassword);
  };

  if (isAuthenticated) {
    navigate("/");
  }

  return (
    <Page>
      <Wrapper>
        <h1>CADASTRO DO SISTEMA</h1>
        <Form onSubmit={(e) => handleSubmit(e)} method={"post"}>
          <ContainerField>
            <label htmlFor="email">E-mail:</label>
            <input
              autoFocus
              className="block"
              autoComplete="nope"
              type="email"
              id="email"
              placeholder="e-mail"
              value={email.toLowerCase()}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </ContainerField>
          <ContainerField>
            <label htmlFor="ConfirmarEmail">Confirmar e-mail:</label>
            <input
              className="block"
              autoComplete="nope"
              type="email"
              id="ConfirmarEmail"
              placeholder="confirmar e-mail"
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
            <label htmlFor="ConfirmarPassword">Confirmar senha:</label>
            <input
              className="block"
              type="password"
              name="ConfirmarPassword"
              id="ConfirmarPassword"
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
          />
        </Form>

        {!error && <span style={{ color: "transparent" }}>#gambiarra#</span>}
        {error && <span style={{ color: "var(--error)" }}>{error}</span>}
        <Link to={"/loginReact/Login"} style={{ textDecoration: "none" }}>
          <Slink value={"log in"} />
        </Link>
      </Wrapper>
    </Page>
  );
};
