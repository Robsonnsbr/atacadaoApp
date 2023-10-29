import { ReactNode, useContext } from "react";
import { Link } from "react-router-dom";
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

        {/* <a to="/atacadaoApp">Home</a> */}
        <Link to="/Controls">Controle</Link>
        <Link to="/Collectors">Coletores</Link>
        <Link to="/Employees">Colaboradores</Link>
        <Link to="/Users">Usuários</Link>
        <Link to="/ReportPage">Relatório</Link>
        <button onClick={handleLogout}>
          <Link to="/Login">Sair</Link>
        </button>
        {user && <span>Usuário: {user.name}</span>}
      </div>
    </S.StyledNaveBar>
  );
};
