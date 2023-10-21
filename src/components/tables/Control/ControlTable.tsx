import React, { useState, useEffect } from "react";
import { Activated } from "../../../@types/Activated";
import {
  ShadowBottom,
  ShadowTop,
  UserTableStyle,
  UserTableStyleContainer,
} from "../Table.style";
// import { AuthContext } from "../../../contexts/AuthContext";
import { Button } from "../../inputs/button/Button";
// import { Modal } from "../../modal/modal";

interface TabelaColaboradoresProps {
  atualizar: boolean;
}

export const ControlTable: React.FC<TabelaColaboradoresProps> = ({
  atualizar,
}) => {
  // const { deleteUserMat } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState<Activated[] | null>([]);
  const [atualizarInterno, setAtualizarInterno] = useState(atualizar);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [usuario, setUserToDelete] = useState<Activated | undefined>();
  // const [msgModal, setMsgModal] = useState<string>("");
  // const [isButtonOff, setIsButtonOff] = useState(false);

  const ActiveUser: Activated = {
    collector: "65\t65 12345678901234567",
    employee: "Robson monteiro\t646469797\tnão informado",
    status: "ATIVO",
  };
  useEffect(() => {
    setUsuarios([ActiveUser]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setAtualizarInterno(atualizar);
  }, [atualizar, atualizarInterno]);

  // const abrirModal = (usuario: Activated | undefined) => {
  //   if (!isButtonOff) {
  //     setUserToDelete(usuario);
  //     setIsModalOpen(true);
  //     return;
  //   }
  //   setIsModalOpen(true);
  // };

  // const fecharModal = () => {
  //   setIsModalOpen(false);
  // };

  // const handleExcluirUsuario = (usuario: Activated | undefined) => {
  //   setUserToDelete(usuario);
  //   setIsButtonOff(false);
  //   if (usuario && usuario.mat) {
  //     setMsgModal(
  //       `Tem certeza de que deseja excluir o usuário: ${usuario?.name} Matrícula: ${usuario?.mat}?`
  //     );
  //     return abrirModal(usuario);
  //   }
  //   alert("Matrícula incorreta ou não informada");
  // };

  // const handleExcluirUsuarioTela = (mat: string) => {
  //   if (usuarios && mat) {
  //     const newUsers = usuarios.filter((user) => user.mat !== mat);
  //     setUsuarios(newUsers); // Atualiza a lista de usuários após a exclusão
  //     setAtualizarInterno(!atualizarInterno); // Altera o estado de atualização interno
  //   }
  // };

  // const warningModal = (usuario: Activated | undefined) => {
  //   setMsgModal(
  //     `O usuário: ${usuario?.name} Matrícula: ${usuario?.mat} excluído com sucesso!`
  //   );
  //   setIsButtonOff(true);
  //   abrirModal(usuario);
  //   setTimeout(() => {
  //     setIsModalOpen(false);
  //   }, 1500);
  // };

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
      {/* <Modal
        isOpen={isModalOpen}
        isButtonOff={isButtonOff}
        message={msgModal}
        onConfirm={() => {
          if (usuario?.employee) {
            deleteUserMat(usuario.employee);
            handleExcluirUsuarioTela(usuario.employee);
          }
          fecharModal();
          warningModal(usuario);
        }}
        onCancel={fecharModal}
      /> */}
      <h3>COLABORADORES ATIVOS</h3>
      <ShadowTop />
      <UserTableStyleContainer className="UserTableStyleContainer">
        <UserTableStyle className="tableContent">
          <thead>
            <tr>
              <th className="info">COLABORADOR</th>
              <th className="info">COLETOR</th>
              <th className="info">STATUS</th>
              <th className="actions">AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {usuarios?.map((user: Activated, index: number) => (
              <tr key={index}>
                <td className="info">{user.employee}</td>
                <td className="info">{user.collector}</td>
                <td
                  className="info"
                  style={{ textAlign: "center", color: "var(--successfully)" }}
                >
                  {user.status}
                </td>
                <td>
                  <Button
                    backgroundcolor="var(--buttonDelete)"
                    type="button"
                    id="btnDeleteUser"
                    value="Desativar"
                    // onClick={() => handleExcluirUsuario(user)}
                  ></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </UserTableStyle>
      </UserTableStyleContainer>
      <ShadowBottom />
      {!usuarios?.length && (
        <p className="warningTable">Nenhum colaborador ativo no momento.</p>
      )}
    </div>
  );
};
