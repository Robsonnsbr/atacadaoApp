import React, { useState, useEffect, useContext } from "react";
import { Employee } from "../../../@types/Employee";
import {
  ShadowBottom,
  ShadowTop,
  UserTableStyle,
  UserTableStyleContainer,
} from "../Table.style";
import { CadastroEmpContext } from "../../../contexts/CadastroEmpContext";
import { Button } from "../../inputs/button/Button";
import { Modal } from "../../modal/modal";

interface TabelaColaboradoresProps {
  atualizar: boolean;
}

export const EmployeeTable: React.FC<TabelaColaboradoresProps> = ({
  atualizar,
}) => {
  const { deleteEmployee } = useContext(CadastroEmpContext);
  const [employees, setEmployee] = useState<Employee[] | null>([]);
  const [atualizarInterno, setAtualizarInterno] = useState(atualizar);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employee, setUserToDelete] = useState<Employee | undefined>();
  const [msgModal, setMsgModal] = useState<string>("");
  const [isButtonOff, setIsButtonOff] = useState(false);

  useEffect(() => {
    const recuperarUsers = () => {
      const recoveredUsers = localStorage.getItem("employee_db");
      if (recoveredUsers) {
        const hasRecoveredUsers = JSON.parse(recoveredUsers);
        setEmployee(hasRecoveredUsers.reverse());
      }
    };
    recuperarUsers();
  }, [atualizarInterno]);

  useEffect(() => {
    setAtualizarInterno(atualizar);
  }, [atualizar, atualizarInterno]);

  const abrirModal = (employee: Employee | undefined) => {
    if (!isButtonOff) {
      setUserToDelete(employee);
      setIsModalOpen(true);
      return;
    }
    setIsModalOpen(true);
  };

  const fecharModal = () => {
    setIsModalOpen(false);
  };

  const handleExcluirUsuario = (employee: Employee | undefined) => {
    setUserToDelete(employee);
    setIsButtonOff(false);
    if (employee && employee.mat) {
      setMsgModal(
        `Tem certeza de que deseja excluir o funcionário: ${employee?.name} Matrícula: ${employee?.mat}?`
      );
      return abrirModal(employee);
    }
    alert("Matrícula incorreta ou não informada");
  };

  const handleExcluirUsuarioTela = (mat: string) => {
    if (employees && mat) {
      const newUsers = employees.filter(
        (employee: Employee) => employee.mat !== mat
      );
      setEmployee(newUsers); // Atualiza a lista de usuários após a exclusão
      setAtualizarInterno(!atualizarInterno); // Altera o estado de atualização interno
    }
  };

  const warningModal = (employee: Employee | undefined) => {
    setMsgModal(
      `O usuário: ${employee?.name} Matrícula: ${employee?.mat} excluído com sucesso!`
    );
    setIsButtonOff(true);
    abrirModal(employee);
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
          if (employee?.mat) {
            deleteEmployee(employee.mat);
            handleExcluirUsuarioTela(employee.mat);
          }
          fecharModal();
          warningModal(employee);
        }}
        onCancel={fecharModal}
      />
      <h3>FUNCIONÁRIO CADASTRADOS</h3>
      <ShadowTop />
      <UserTableStyleContainer className="UserTableStyleContainer">
        <UserTableStyle className="tableContent">
          <thead>
            <tr>
              <th className="information">NOME</th>
              <th className="information">MATRÍCULA</th>
              <th className="information">PERÍODO</th>
              {/* TODO: adicionar período ao colaborador controle */}
              <th className="actions">AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {employees?.map((user: Employee, index: number) => (
              <tr key={index}>
                <td className="information">{user.name}</td>
                <td className="information">{user.mat}</td>
                <td className="information" style={{ textAlign: "center" }}>
                  {user.workShift}
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
      <ShadowBottom className="ShadowBottom" />
      {!employees?.length && (
        <p className="warningTable">Nenhum funcionário cadastrado!</p>
      )}
    </div>
  );
};
