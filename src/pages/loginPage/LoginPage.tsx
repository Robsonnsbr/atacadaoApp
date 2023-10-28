import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import {
  Button,
  ContainerField,
  Form,
  Main,
  PageContent,
  // Slink,
  Wrapper,
} from "../../components";
// import { Link } from "react-router-dom";
// import { createSession } from "../../services/api";

export const LoginPages = () => {
  const { isAuthenticated, login, error } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(), login(email, password);
    // createSession(email, password);
  };

  return (
    <PageContent>
      <Main>
        <Wrapper>
          <div className="containerCadastro">
            <h1>COLLECTOR SYSTEM LOGIN</h1>
            <Form onSubmit={(e) => handleSubmit(e)} method={"post"}>
              <label style={{ fontSize: "15px" }} htmlFor="mat">
                Matricula:
              </label>
              <ContainerField className="inputName">
                <input
                  autoFocus
                  autoComplete="true"
                  type="text"
                  id="mat"
                  placeholder="matricula"
                  maxLength={15}
                  value={email.toLowerCase()}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </ContainerField>
              <label style={{ fontSize: "15px" }} htmlFor="password">
                Password:
              </label>
              <ContainerField>
                <input
                  style={{ minWidth: "300px" }}
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
                backgroundcolor="var(--successfully)"
                type={"submit"}
                id={"btnSubmit"}
                name={"btnSubmit"}
                value={"Entrar"}
              />
            </Form>
            <div className="warningLogin">
              {!error && !isAuthenticated && (
                <span style={{ color: "transparent", margin: "0px" }}>
                  #gambiarra#
                </span>
              )}
              {error && !isAuthenticated && (
                <span
                  className="warningLogin"
                  style={{
                    color: "var(--error)",
                    margin: "0px",
                    textShadow: "0 0 1px rgb(0,0,0, 0.3)",
                  }}
                >
                  {error}
                </span>
              )}
            </div>
            {/* 
            <Link to={"/atacadaoApp/Users"} style={{ textDecoration: "none" }}>
              <Slink value="Sign up" />
            </Link> */}
          </div>
        </Wrapper>
      </Main>
    </PageContent>
  );
};
