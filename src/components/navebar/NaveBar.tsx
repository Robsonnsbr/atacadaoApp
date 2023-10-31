import { ReactNode, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as S from "./NaveBar.Style";
import { AuthContext } from "../../contexts/AuthContext";
import iconAtacadaoSvg from "../../assets/logo-atacadao-marketplace2.png";
import { useNavigate, useLocation } from "react-router-dom";

interface MainProps {
  children?: ReactNode;
}

export const NaveBar = ({ children }: MainProps) => {
  const { logout, user } = useContext(AuthContext);
  const [paginaSelected, setPaginaSelected] = useState("");
  const [, setPaginaAtual] = useState(paginaSelected);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Atualiza o valor de paginaSelected sempre que a localização (URL) muda
    setPaginaSelected(location.pathname);
  }, [location]);

  const handleSelectChange = (value: string) => {
    setPaginaAtual(value);
    navigate(value);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <S.StyledNaveBar>
      <div className="navbar">
        {children}
        {user && <span>Usuário: {user.name}</span>}
        <div className="logo">
          <img src={iconAtacadaoSvg} alt="Logo da sua empresa" />
        </div>

        <div className="linksNavbar">
          <Link to="/Controls">Controle</Link>
          <Link to="/Collectors">Coletores</Link>
          <Link to="/Employees">Colaboradores</Link>
          <Link to="/Users">Usuários</Link>
          <Link to="/ReportPage">Relatório</Link>
          <button onClick={handleLogout}>
            <Link to="/Login">Sair</Link>
          </button>
        </div>
      </div>
      <div className="SelectNavbar">
        <select
          value={paginaSelected}
          onChange={(event) => handleSelectChange(event.target.value)}
        >
          <option value="">Menu Páginas</option>
          <option value="/Controls">Controls</option>
          <option value="/Collectors">Collectors</option>
          <option value="/Users">Users</option>
          <option value="/ReportPage">ReportPage</option>
          <option value="/Login">Sair</option>
        </select>
      </div>
    </S.StyledNaveBar>
  );
};
