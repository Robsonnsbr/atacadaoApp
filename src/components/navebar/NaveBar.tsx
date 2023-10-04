import { ReactNode, useContext } from "react";
import * as S from "./NaveBar.Style";
import { AuthContext } from "../../contexts/AuthContext";

interface MainProps {
  children?: ReactNode;
}

export const NaveBar = ({ children }: MainProps) => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <S.StyledNaveBar>
      <div className="navbar">
        {children}
        <a href="/AppCollector">Home</a>
        <a href="/AppCollector/cadastro">Cadastrar</a>
        <button
          onClick={handleLogout}
          style={{
            background: "none",
            color: "inherit",
            border: "none",
            padding: 0,
            font: "inherits",
            cursor: "pointerinherits",
            outline: "inherits",
          }}
        >
          <a href="/AppCollector/Login">Sair</a>
        </button>
      </div>
    </S.StyledNaveBar>
  );
};
