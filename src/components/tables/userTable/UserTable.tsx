import React, { useState, useEffect, useContext } from "react";
import { User } from "../../../@types/User";
import { UserTableStyle } from "./UserTable.style";
import { AuthContext } from "../../../contexts/AuthContext";
import { Button } from "../../inputs/button/Button";

interface TabelaFuncionariosProps {
  atualizar: boolean;
}

export const TabelaFuncionarios: React.FC<TabelaFuncionariosProps> = ({
  atualizar,
}) => {
  const { deleteUserMat } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState<User[] | undefined>([]);
  const [atualizarInterno, setAtualizarInterno] = useState(atualizar);

  useEffect(() => {
    const recuperarUsers = () => {
      const recoveredUsers = localStorage.getItem("users_db");
      if (recoveredUsers) {
        const hasRecoveredUsers = JSON.parse(recoveredUsers);
        setUsuarios(hasRecoveredUsers.reverse()); // Reverter a ordem do array
        console.log("useEffect executado");
      }
    };
    recuperarUsers();
  }, [atualizarInterno]);

  useEffect(() => {
    setAtualizarInterno(atualizar);
  }, [atualizar]);

  const handleExcluirUsuario = (mat: string | undefined) => {
    if (!mat) {
      return alert("Matrícula incorreta ou não informada");
    }
    deleteUserMat(mat);
    handleExcluirUsuarioTela(mat);
  };

  const handleExcluirUsuarioTela = (mat: string | undefined) => {
    if (mat) {
      setUsuarios((users) => users?.filter((user) => user.mat !== mat));
      console.log("Exclusão realizada");
    }
  };

  return (
    <>
      <h2>Tabela de Funcionários</h2>
      <UserTableStyle>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Matrícula</th>
            <th>Password</th>
            <th>Ações</th>
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
    </>
  );
};
