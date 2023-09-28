import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Page, Wrapper, Button } from "../../components";
import { StyledButtonRow } from "../../components/inputs/button/Button.style";

export const HomePage = () => {
  const { logout, deleteUser, user } = useContext(AuthContext);

  const handleDeleteUser = () => {
    deleteUser();
  };
  const handleLogout = () => {
    logout();
  };

  return (
    <Page>
      <Wrapper>
        <h1>Bem-vindo!</h1>
        <p>{user?.email}</p>
        <StyledButtonRow>
          <Button
            backgroundcolor="var(--buttonDelete)"
            type={"button"}
            id={"btnLogout"}
            value={"Logout"}
            onClick={handleLogout}
          ></Button>
          <Button
            backgroundcolor="var(--buttonDelete)"
            type={"button"}
            id={"btnDeleteUser"}
            value={"delete"}
            onClick={handleDeleteUser}
          ></Button>
        </StyledButtonRow>
      </Wrapper>
    </Page>
  );
};
