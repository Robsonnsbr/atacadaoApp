import React, { useState, useEffect, useContext } from "react";
import { User } from "../../../@types/User";
import {
  ShadowBottom,
  ShadowTop,
  UserTableStyle,
  UserTableStyleContainer,
} from "../Table.style";
import { AuthContext } from "../../../contexts/AuthContext";
import { Button } from "../../inputs/button/Button";
import { Modal } from "../../modal/modal";

interface TabelaColaboradoresProps {
  atualizar: boolean;
}

export const UserTable: React.FC<TabelaColaboradoresProps> = ({
  atualizar,
}) => {
  const { deleteUserMat } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState<User[] | null>([]);
  const [atualizarInterno, setAtualizarInterno] = useState(atualizar);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuario, setUserToDelete] = useState<User | undefined>();
  const [msgModal, setMsgModal] = useState<string>("");
  const [isButtonOff, setIsButtonOff] = useState(false);

  useEffect(() => {
    const recuperarUsers = () => {
      const recoveredUsers = localStorage.getItem("users_db");
      if (recoveredUsers) {
        const hasRecoveredUsers = JSON.parse(recoveredUsers);
        setUsuarios(hasRecoveredUsers.reverse());
      }
    };
    recuperarUsers();
  }, [atualizarInterno]);

  useEffect(() => {
    setAtualizarInterno(atualizar);
  }, [atualizar, atualizarInterno]);

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

  const abrirModal = (usuario: User | undefined) => {
    if (!isButtonOff) {
      setUserToDelete(usuario);
      setIsModalOpen(true);
      return;
    }
    setIsModalOpen(true);
  };

  const fecharModal = () => {
    setIsModalOpen(false);
  };

  const warningModal = (usuario: User | undefined) => {
    setMsgModal(
      `O usuário: ${usuario?.name} Matrícula: ${usuario?.mat} excluído com sucesso!`
    );
    setIsButtonOff(true);
    abrirModal(usuario);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 1500);
  };

  const handleExcluirUsuario = (usuario: User | undefined) => {
    setUserToDelete(usuario);
    setIsButtonOff(false);
    if (usuario && usuario.mat) {
      setMsgModal(
        `Tem certeza de que deseja excluir o usuário: ${usuario?.name} Matrícula: ${usuario?.mat}?`
      );
      return abrirModal(usuario);
    }
    alert("Matrícula incorreta ou não informada");
  };

  const handleExcluirUsuarioTela = (mat: string) => {
    if (usuarios && mat) {
      const newUsers = usuarios.filter((user) => user.mat !== mat);
      setUsuarios(newUsers); // Atualiza a lista de usuários após a exclusão
      setAtualizarInterno(!atualizarInterno); // Altera o estado de atualização interno
    }
  };

  return (
    <div className="tabelaContainer">
      <Modal
        isOpen={isModalOpen}
        isButtonOff={isButtonOff}
        message={msgModal}
        onConfirm={() => {
          if (usuario?.mat) {
            deleteUserMat(usuario.mat);
            handleExcluirUsuarioTela(usuario.mat);
          }
          fecharModal();
          warningModal(usuario);
        }}
        onCancel={fecharModal}
      />
      <h3>USUÁRIOS CADASTRADOS</h3>
      <ShadowTop />
      <UserTableStyleContainer className="UserTableStyleContainer">
        <UserTableStyle className="tableContent">
          <thead>
            <tr>
              <th className="info">NOME</th>
              <th className="info">MATRÍCULA</th>
              <th className="info">CPF</th>
              <th className="actions">AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {usuarios?.map((user: User, index: number) => (
              <tr key={index}>
                <td className="info">{user.name}</td>
                <td className="info">{user.mat}</td>
                <td className="info">
                  {user.cpf?.replace(
                    /(\d{3})(\d{3})(\d{3})(\d{2})/,
                    "$1.$2.$3-$4"
                  )}
                </td>
                <td>
                  <Button
                    backgroundcolor="var(--buttonDelete)"
                    type="button"
                    id="btnDeleteUser"
                    value="Excluir"
                    onClick={() => handleExcluirUsuario(user)}
                  ></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </UserTableStyle>
      </UserTableStyleContainer>
      <ShadowBottom />
      {!usuarios?.length && (
        <p className="warningTable">Nenhum usuário cadastrado!</p>
      )}
    </div>
  );
};
