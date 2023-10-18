import React, { useState, useEffect, useContext } from "react";
import { User } from "../../../@types/User";
import { UserTableStyle, UserTableStyleContainer } from "./UserTable.style";
import { AuthContext } from "../../../contexts/AuthContext";
import { Button } from "../../inputs/button/Button";
import { Modal } from "../../../components/modal/modal";

interface TabelaFuncionariosProps {
  atualizar: boolean;
}

export const TabelaFuncionarios: React.FC<TabelaFuncionariosProps> = ({
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
      <h2>USUÁRIOS CADASTRADOS</h2>
      <UserTableStyleContainer>
        <UserTableStyle>
          <thead>
            <tr>
              <th className="information">NOME</th>
              <th className="information">MATRÍCULA</th>
              <th className="information">CPF</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {usuarios?.map((user: User, index: number) => (
              <tr key={index}>
                <td className="information">{user.name}</td>
                <td className="information">{user.mat}</td>
                <td className="information">
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
        {!usuarios?.length && <p>Nenhum usuário cadastrado!</p>}
      </UserTableStyleContainer>
    </div>
  );
};
