import React, { useState, useEffect, useContext } from "react";
import { Collector } from "../../../@types/Collector";
import {
  ShadowBottom,
  ShadowTop,
  UserTableStyle,
  UserTableStyleContainer,
} from "../Table.style";
import { CadastroColleContext } from "../../../contexts/CadastroColleContext";
import { Button } from "../../inputs/button/Button";
import { Modal } from "../../modal/modal";

interface TabelaColaboradoresProps {
  atualizar: boolean;
}

export const CollectorTable: React.FC<TabelaColaboradoresProps> = ({
  atualizar,
}) => {
  const { deleteCollector } = useContext(CadastroColleContext);
  const [collectors, setCollectors] = useState<Collector[] | null>([]);
  const [atualizarInterno, setAtualizarInterno] = useState(atualizar);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collector, setUserToDelete] = useState<Collector | undefined>();
  const [msgModal, setMsgModal] = useState<string>("");
  const [isButtonOff, setIsButtonOff] = useState(false);

  useEffect(() => {
    const recuperarUsers = () => {
      const recoveredUsers = localStorage.getItem("collector_db");
      if (recoveredUsers) {
        const hasRecoveredUsers = JSON.parse(recoveredUsers);
        setCollectors(hasRecoveredUsers.reverse());
      }
    };
    recuperarUsers();
  }, [atualizarInterno]);

  useEffect(() => {
    setAtualizarInterno(atualizar);
  }, [atualizar, atualizarInterno]);

  const abrirModal = (collector: Collector | undefined) => {
    if (!isButtonOff) {
      setUserToDelete(collector);
      setIsModalOpen(true);
      return;
    }
    setIsModalOpen(true);
  };

  const fecharModal = () => {
    setIsModalOpen(false);
  };

  const handleExcluirUsuario = (collector: Collector | undefined) => {
    setUserToDelete(collector);
    setIsButtonOff(false);
    if (collector && collector.sn) {
      setMsgModal(
        `Tem certeza de que deseja excluir o funcionário: ${collector?.numero} Matrícula: ${collector?.sn}?`
      );
      return abrirModal(collector);
    }
    alert("Matrícula incorreta ou não informada");
  };

  const handleExcluirUsuarioTela = (sn: string) => {
    if (collectors && sn) {
      const newUsers = collectors.filter((collector) => collector.sn !== sn);
      setCollectors(newUsers); // Atualiza a lista de usuários após a exclusão
      setAtualizarInterno(!atualizarInterno); // Altera o estado de atualização interno
    }
  };

  const warningModal = (collector: Collector | undefined) => {
    setMsgModal(
      `O usuário: ${collector?.numero} Matrícula: ${collector?.sn} excluído com sucesso!`
    );
    setIsButtonOff(true);
    abrirModal(collector);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 1500);
  };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const container = document.querySelector(
  //       ".UserTableStyleContainer"
  //     ) as HTMLElement;
  //     const shadowTop = document.querySelector(".ShadowTop") as HTMLElement;
  //     const shadowBottom = document.querySelector(
  //       ".ShadowBottom"
  //     ) as HTMLElement;

  //     if (container.scrollTop > 0) {
  //       shadowTop.style.display = "block";
  //     } else {
  //       shadowTop.style.display = "none";
  //     }

  //     if (
  //       container.scrollTop + container.clientHeight <
  //       container.scrollHeight
  //     ) {
  //       shadowBottom.style.display = "block";
  //     } else {
  //       shadowBottom.style.display = "none";
  //     }
  //   };

  //   const container = document.querySelector(
  //     ".UserTableStyleContainer"
  //   ) as HTMLElement;
  //   container.addEventListener("scroll", handleScroll);

  //   return () => {
  //     container.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector(
        ".UserTableStyleContainer"
      ) as HTMLElement;
      const shadowTop = document.querySelector(".ShadowTop") as HTMLElement;
      const shadowBottom = document.querySelector(
        ".ShadowBottom"
      ) as HTMLElement;

      if (container.scrollTop > 0) {
        shadowTop.style.display = "block";
      } else {
        shadowTop.style.display = "none";
      }

      if (
        container.scrollTop + container.clientHeight <
        container.scrollHeight
      ) {
        shadowBottom.style.display = "block";
      } else {
        shadowBottom.style.display = "none";
      }
    };

    const container = document.querySelector(
      ".UserTableStyleContainer"
    ) as HTMLElement;
    container.addEventListener("scroll", handleScroll);

    // Função para acionar handleScroll quando a classe muda (scroll ativado/desativado)
    const observeContainerChanges = () => {
      const observer = new MutationObserver(() => {
        handleScroll(); // Chama handleScroll quando as mudanças ocorrem no container
      });
      observer.observe(container, {
        attributes: true,
        attributeFilter: ["class", "style"],
      });
    };

    observeContainerChanges(); // Inicia a observação

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="tabelaContainer">
      <Modal
        isOpen={isModalOpen}
        isButtonOff={isButtonOff}
        message={msgModal}
        onConfirm={() => {
          if (collector?.sn) {
            deleteCollector(collector.sn);
            handleExcluirUsuarioTela(collector.sn);
          }
          fecharModal();
          warningModal(collector);
        }}
        onCancel={fecharModal}
      />
      <h3>COLETORES CADASTRADOS</h3>
      <ShadowTop />
      <UserTableStyleContainer className="UserTableStyleContainer">
        <UserTableStyle className="tableContent">
          <thead>
            <tr>
              <th className=" info info-num-collector">NÚMERO</th>
              <th className="info info-sn-collector">SERIAL COLETOR</th>
              <th className="actions">AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {collectors?.map((collector: Collector, index: number) => (
              <tr key={index}>
                <td style={{ textAlign: "center" }}>{collector.numero}</td>
                <td className="info">{collector.sn}</td>
                <td>
                  <Button
                    backgroundcolor="var(--buttonDelete)"
                    type="button"
                    id="btnDeleteUser"
                    value="Excluir"
                    onClick={() => handleExcluirUsuario(collector)}
                  ></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </UserTableStyle>
      </UserTableStyleContainer>
      <ShadowBottom className="ShadowBottom" />
      {!collectors?.length && (
        <p className="warningTable">Nenhum coletor cadastrado!</p>
      )}
    </div>
  );
};
