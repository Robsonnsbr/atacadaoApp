import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";

import { LoginPages, HomePage, CadastroUser, CadastroEmployee, CadastroCollector} from "../pages";
import { AuthProvider, AuthContext } from "../contexts/AuthContext";
import { CadastroProvider } from "../contexts/CadastroContext";
// import { NaveBar } from "../components";
interface PrivateProps {
  children: React.ReactElement;
}

export const AppRoutes = () => {
  const Private = ({ children }: PrivateProps) => {
    const { isAuthenticated } = useContext(AuthContext);

    // if (loading) {
    //   console.log("Entrei aqui");
    //   //TODO: corrigir loading na pasta AuthContext..
    //   return <div>Em Carregamento...</div>;
    // }

    if (!isAuthenticated) {
      return <Navigate to="/AppCollector/Login" />;
    }
    return children;
  };

  return (
    <Router>
      <AuthProvider>
        <CadastroProvider>
          <Routes>
            <Route path="AppCollector/login" element={<LoginPages />} />

            <Route path="AppCollector/Users" element={<CadastroUser />} />
            <Route path="AppCollector/Employees" element={<CadastroEmployee />} />
            <Route path="AppCollector/Collectors" element={<CadastroCollector />} />
            <Route
              path="AppCollector/"
              element={
                <Private>
                  <HomePage />
                </Private>
              }
            />
          </Routes>
        </CadastroProvider>
      </AuthProvider>
    </Router>
  );
};
