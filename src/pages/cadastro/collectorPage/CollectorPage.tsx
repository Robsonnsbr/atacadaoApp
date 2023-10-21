import { useState, useContext, useEffect } from "react";
// import { AuthContext } from "../../contexts/AuthContext";
import { CadastroColleContext } from "../../../contexts/CadastroColleContext";
import {
  Button,
  ContainerField,
  Form,
  Main,
  NaveBar,
  PageContent,
  Wrapper,
} from "../../../components";
import { CollectorTable } from "../../../components/tables";
import { motion } from "framer-motion";

export const CollectorPage = () => {
  // const { isAuthenticated } = useContext(AuthContext);
  const { cadastro, error } = useContext(CadastroColleContext);

  // const navigate = useNavigate();
  const [numero, setNumero] = useState("");
  const [sn, setSN] = useState("");
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
    event.preventDefault(), cadastro(numero, sn, confirmMat);
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
    setNumero("");
    setSN("");
    setConfirmMat("");
    document.getElementById("name")?.focus();
  };

  // const fornsarCPF = (value: string) => {
  //   // Função para fornsar o CPF
  //   // Implemente a lógica de fornsação aqui, se necessário
  //   // Exemplo simples:
  //   const cpfFornsado = value
  //     .replace(/\D/g, "")
  //     .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  //   console.log(cpfFornsado);
  //   return cpfFornsado;
  // };

  // const usuario: User = { name, sn, password };
  // if (isAuthenticated) {
  //   navigate("/");
  // }

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
    <PageContent>
      <NaveBar />
      <motion.div variants={containerMotion} initial="hidden" animate="show">
        <Main>
          <Wrapper>
            <div className="containerCadastro">
              <h1>CADASTRO DE COLETORES</h1>
              <Form onSubmit={(e) => handleSubmit(e)} method={"post"}>
                <label htmlFor="numero">NÚMERO DO COLETOR</label>
                <ContainerField className="inputName">
                  <input
                    autoFocus
                    className="block"
                    autoComplete="nope"
                    type="text"
                    id="numero"
                    placeholder="número"
                    maxLength={3}
                    value={numero.toLowerCase()}
                    onChange={(event) => setNumero(event.target.value)}
                    required
                    title="aaaaa"
                  />
                </ContainerField>
                <label htmlFor="sn">SERIAL DO COLETOR</label>
                <ContainerField>
                  <input
                    className="block"
                    autoComplete="nope"
                    type="text"
                    id="sn"
                    placeholder="número de série"
                    maxLength={20}
                    value={sn.toLowerCase().replace(/\s+/g, "")}
                    onChange={(event) => setSN(event.target.value)}
                    required
                  />
                </ContainerField>
                <ContainerField className="inputMat">
                  <input
                    className="block"
                    autoComplete="nope"
                    type="text"
                    id="confirmarMat"
                    placeholder="confirmar sn"
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
            <CollectorTable atualizar={atualizarFilho} />
          </Wrapper>
        </Main>
      </motion.div>
    </PageContent>
  );
};
