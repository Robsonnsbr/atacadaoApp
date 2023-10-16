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
  const [matToDelete, setMatToDelete] = useState<string | undefined>();

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

  const abrirModal = (mat: string | undefined) => {
    setMatToDelete(mat);
    setIsModalOpen(true);
  };

  const fecharModal = () => {
    setIsModalOpen(false);
  };

  const handleExcluirUsuario = (mat: string | undefined) => {
    abrirModal(mat);
    if (!mat) {
      return alert("Matrícula incorreta ou não informada");
    }
  };

  const handleExcluirUsuarioTela = (mat: string | undefined) => {
    if (mat) {
      setUsuarios((users) => users?.filter((user) => user.mat !== mat));
    }
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        message={`Tem certeza de que deseja excluir este o usuário ${matToDelete}?`}
        onConfirm={() => {
          if (matToDelete) {
            deleteUserMat(matToDelete);
            handleExcluirUsuarioTela(matToDelete);
          }
          fecharModal();
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
                    onClick={() => handleExcluirUsuario(usuario.mat)}
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
