import { ReactNode, useContext } from "react";
import * as S from "./NaveBar.Style";
import { AuthContext } from "../../contexts/AuthContext";
import iconAtacadaoSvg from "../../assets/logo-atacadao-marketplace2.png";

interface MainProps {
  children?: ReactNode;
}

export const NaveBar = ({ children }: MainProps) => {
  const { logout, user } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };
  // console.log(`Usuário Ativo NavBar: ${user?.name}`);
  return (
    <S.StyledNaveBar>
      <div className="navbar">
        {children}

        <div className="logo">
          <img src={iconAtacadaoSvg} alt="Logo da sua empresa" />
        </div>

        {/* <a href="/atacadaoApp">Home</a> */}
        <a href="/atacadaoApp/Controls">Controle</a>
        <a href="/atacadaoApp/Collectors">Coletores</a>
        <a href="/atacadaoApp/Employees">Colaboradores</a>
        <a href="/atacadaoApp/Users">Usuários</a>
        <a href="/atacadaoApp/ReportPage">Relatório</a>
        <button onClick={handleLogout}>
          <a href="/atacadaoApp/Login">Sair</a>
        </button>
        {user && <span>Usuário: {user.name}</span>}
      </div>
    </S.StyledNaveBar>
  );
};
