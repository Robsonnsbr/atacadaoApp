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
  const [confirmMat, setConfirmSN] = useState("");
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
    //obs: não remover o parse, pois precisamos utilizar numero na fn sort da colletorTable
    const numNumber = parseInt(numero);
    event.preventDefault(), cadastro(numNumber, sn, confirmMat);
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
    setConfirmSN("");
    document.getElementById("name")?.focus();
    //TODO: excluir essa chamada do localStorage abaixo usado apenas para teste
    // localStorage.setItem(
    //   "collector_db",
    //   JSON.stringify([
    //     { numero: 1, sn: "35468435732462452" },
    //     { numero: 2, sn: "12345435732466789" },
    //     { numero: 3, sn: "98765435732464321" },
    //     { numero: 4, sn: "54357324655555555" },
    //     { numero: 5, sn: "77777743573246777" },
    //     { numero: 6, sn: "88888884357324688" },
    //     { numero: 7, sn: "99943573246999999" },
    //     { numero: 8, sn: "14357324611111111" },
    //     { numero: 9, sn: "22435732462222222" },
    //     { numero: 10, sn: "33333334357324633" },
    //     { numero: 11, sn: "44357324644444444" },
    //     { numero: 12, sn: "12312435732463123" },
    //     { numero: 13, sn: "45435732466456456" },
    //     { numero: 14, sn: "78435732469789789" },
    //     { numero: 15, sn: "12121214357324621" },
    //     { numero: 16, sn: "34343434357324643" },
    //     { numero: 17, sn: "56435732465656565" },
    //     { numero: 18, sn: "78784357324678787" },
    //     { numero: 19, sn: "1234443573246321" },
    //     { numero: 20, sn: "9435732468761234" },
    //   ])
    // );
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
                    value={numero}
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
                    onChange={(event) => setConfirmSN(event.target.value)}
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
