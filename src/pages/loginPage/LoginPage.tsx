import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import userTest from "../../contexts/userTestMaster.json";
import {
  Button,
  ContainerField,
  Form,
  Main,
  PageContent,
  // Slink,
  Wrapper,
} from "../../components";
import { BsEye, BsEyeSlash } from "react-icons/bs";
// import { Link } from "react-router-dom";
// import { createSession } from "../../services/api";

export const LoginPages = () => {
  const { isAuthenticated, login, error } = useContext(AuthContext);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const usersTestConvert = JSON.stringify(userTest);
    localStorage.setItem("users_db", usersTestConvert);
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(), login(email, password);
    // createSession(email, password);
  };

  const handleToggleSenha = () => {
    setMostrarSenha(!mostrarSenha);
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
                  placeholder="matricula | master@123"
                  maxLength={15}
                  value={email.toLowerCase()}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </ContainerField>
              <label style={{ fontSize: "15px" }} htmlFor="password">
                Password:
              </label>
              <ContainerField className="inputPass">
                <div
                  style={{
                    maxWidth: "310px",
                    maxHeight: "39.2px",
                  }}
                >
                  <input
                    name="password"
                    id="password"
                    value={password}
                    type={mostrarSenha ? "text" : "password"}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="password | Master@123"
                    required
                  />
                  <button
                    className="btnViewPassword"
                    type="button"
                    onClick={() => handleToggleSenha()}
                  >
                    {mostrarSenha ? <BsEyeSlash /> : <BsEye />}
                  </button>
                </div>
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
