import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Main, Wrapper, NaveBar, PageContent } from "../../components";
import { motion } from "framer-motion";

//TODO: implementas!!

export const ReportPage = () => {
  // const { logout, deleteUser, user } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

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
    <PageContent>
      <NaveBar />
      <motion.div variants={containerMotion} initial="hidden" animate="show">
        <Main>
          <Wrapper>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <h1 style={{ fontSize: "24px", margin: "10px" }}>
                IMPLEMENTAR RELATÓRIO
              </h1>
              <p style={{ fontSize: "18px", margin: "5px" }}>{user?.name}</p>
              <p style={{ fontSize: "16px", margin: "5px" }}>
                Colocar todas as ações feitas no sistema nesse relatório
              </p>
            </div>
          </Wrapper>
        </Main>
      </motion.div>
    </PageContent>
  );
};
