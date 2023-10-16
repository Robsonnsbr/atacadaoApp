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
  const [usuarios, setUsuarios] = useState<User[] | undefined>([]);
  const [atualizarInterno, setAtualizarInterno] = useState(atualizar);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | undefined>();

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
  }, [atualizar]);

  const abrirModal = (usuario: User | undefined) => {
    setUserToDelete(usuario);
    setIsModalOpen(true);
  };

  const fecharModal = () => {
    setIsModalOpen(false);
  };

  const handleExcluirUsuario = (usuario: User | undefined) => {
    if (usuario && usuario.mat) {
      return abrirModal(usuario);
    }
    alert("Matrícula incorreta ou não informada");
  };

  const handleExcluirUsuarioTela = (usuario: User | undefined) => {
    if (usuario && usuario.mat) {
      setUsuarios((usuarios) =>
        usuarios?.filter((usuario) => usuario.mat !== usuario.mat)
      );
    }
  };

  const warningModal = () => {
    //TODO: chamar modal com outra msg de sucesso
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        message={`Tem certeza de que deseja excluir o usuário: ${userToDelete?.name}. Matrícula: ${userToDelete?.mat}?`}
        onConfirm={() => {
          if (userToDelete?.mat) {
            deleteUserMat(userToDelete.mat);
            handleExcluirUsuarioTela(userToDelete);
          }
          fecharModal();
          warningModal();
        }}
        onCancel={fecharModal}
      />
      <h2>Usuários</h2>
      <UserTableStyleContainer>
        <UserTableStyle>
          <thead>
            <tr>
              <th>NOME</th>
              <th>MATRÍCULA</th>
              <th>SENHA</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {usuarios?.map((usuario: User, index: number) => (
              <tr key={index}>
                <td>{usuario.name}</td>
                <td>{usuario.mat}</td>
                <td>{usuario.password}</td>
                <td>
                  <Button
                    backgroundcolor="var(--buttonDelete)"
                    type="button"
                    id="btnDeleteUser"
                    value="Excluir"
                    onClick={() => handleExcluirUsuario(usuario)}
                  ></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </UserTableStyle>
      </UserTableStyleContainer>
    </div>
  );
};
