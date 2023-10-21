import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
// import { Main, Wrapper, Button, NaveBar, PageContent } from "../../components";
import { Main, Wrapper, NaveBar, PageContent } from "../../components";
// import { StyledButtonRow } from "../../components/inputs/button/Button.style";
import { RowCollector } from "../../components/inputs/rowCollector/rowCollerctor";

export const HomePage = () => {
  // const { logout, deleteUser, user } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  // const handleDeleteUser = () => {
  //   deleteUser();
  // };
  // const handleLogout = () => {
  //   logout();
  // };

  return (
    <PageContent>
      <NaveBar />
      <h1>Bem-vindo!</h1>
      <p>{user?.name}</p>
      <Main>
        <Wrapper>
          <ul>
            <RowCollector />
          </ul>
          {/* <StyledButtonRow>
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
          </StyledButtonRow> */}
        </Wrapper>
      </Main>
    </PageContent>
  );
};
