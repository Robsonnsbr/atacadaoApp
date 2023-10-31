import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
// import { Main, Wrapper, Button, NaveBar, PageContent } from "../../components";
import { Main, Wrapper, NaveBar, PageContent } from "../../components";
// import { StyledButtonRow } from "../../components/inputs/button/Button.style";
import { RowCollector } from "../../components/inputs/rowCollector/rowCollector";
import { motion } from "framer-motion";

export const HomePage = () => {
  // const { logout, deleteUser, user } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  // const handleDeleteUser = () => {
  //   deleteUser();
  // };
  // const handleLogout = () => {
  //   logout();
  // };
  const containerMotion = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerDirection: -1,
      },
    },
  };
  return (
    <motion.div variants={containerMotion} initial="hidden" animate="show">
      <PageContent>
        <NaveBar />
        <h1>Bem-vindo!</h1>
        <p>{user?.name}</p>
        <Main>
          <Wrapper>
            <ul>
              <RowCollector />
            </ul>
          </Wrapper>
        </Main>
      </PageContent>
    </motion.div>
  );
};
