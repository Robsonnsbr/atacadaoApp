import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import atacadaologo2 from "../../assets/atacadaologo2.png";
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
import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { createSession } from "../../services/api";

import userTest from "../../../server/usersTest.json";
import employeeTest from "../../../server/employeeTest.json";
import collectorTest from "../../../server/collectorTest.json";
import activeTest from "../../../server/activeTest.json";

export const LoginPages = () => {
  const { isAuthenticated, login, error } = useContext(AuthContext);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const usersTestConvert = JSON.stringify(userTest);
    localStorage.setItem("users_db", usersTestConvert);
    const employeeTestConvert = JSON.stringify(employeeTest);
    localStorage.setItem("employee_db", employeeTestConvert);
    const collectorTestConvert = JSON.stringify(collectorTest);
    localStorage.setItem("collector_db", collectorTestConvert);
    const activeTestConvert = JSON.stringify(activeTest);
    localStorage.setItem("activeUsers_db", activeTestConvert);
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(), login(email, password);
    // createSession(email, password);
  };

  const handleToggleSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const containerMotion = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerDirection: -1,
      },
    },
  };
  return (
    <>
      <span
        style={{
          fontSize: "12px",
          position: "absolute",
          left: "10px",
          top: "5px",
        }}
      >
        <i>1.0.0-dev</i>
      </span>
      <motion.div variants={containerMotion} initial="hidden" animate="show">
        <PageContent>
          <Main>
            <Wrapper>
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: -1000 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ y: -window.innerWidth }}
                transition={{ duration: 0.7 }}
              >
                <div className="containerCadastro">
                  <h1>CONTROLE DE COLETORES</h1>
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
                          {mostrarSenha ? (
                            <BsEyeSlash style={{ marginLeft: "5px" }} />
                          ) : (
                            <BsEye style={{ marginLeft: "5px" }} />
                          )}
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
              </motion.div>
              <div className="logo">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, x: -1000 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ y: -window.innerWidth }}
                  transition={{ duration: 0.5 }}
                >
                  <img src={atacadaologo2} alt="Logo da sua empresa" />
                </motion.div>
              </div>
            </Wrapper>
          </Main>
        </PageContent>
      </motion.div>
    </>
  );
};
