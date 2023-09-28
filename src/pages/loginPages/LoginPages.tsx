import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import {
  Button,
  ContainerField,
  Form,
  Page,
  Slink,
  Wrapper,
} from "../../components";
import { Link } from "react-router-dom";
import { createSession } from "../../services/api";

export const LoginPage = () => {
  const { isAuthenticated, login, error } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(), login(email, password);
    createSession(email, password);
  };

  return (
    <Page>
      <Wrapper>
        <h1>LOGIN DO SISTEMA</h1>
        <Form onSubmit={(e) => handleSubmit(e)} method={"post"}>
          <ContainerField>
            <label htmlFor="email">E-mail:</label>
            <input
              autoFocus
              autoComplete="true"
              type="email"
              id="email"
              placeholder="e-mail"
              value={email.toLowerCase()}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </ContainerField>
          <ContainerField>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="password"
              required
            />
          </ContainerField>
          <Button
            backgroundcolor="var(--buttonEnter)"
            type={"submit"}
            id={"btnSubmit"}
            name={"btnSubmit"}
            value={"Entrar"}
          />
        </Form>
        {!error && !isAuthenticated && (
          <span style={{ color: "transparent", margin: "0px" }}>
            #gambiarra#
          </span>
        )}
        {error && !isAuthenticated && (
          <span style={{ color: "var(--error)", margin: "0px" }}>{error}</span>
        )}

        <Link to={"/loginReact/cadastro"} style={{ textDecoration: "none" }}>
          <Slink value="Sign up" />
        </Link>
      </Wrapper>
    </Page>
  );
};
