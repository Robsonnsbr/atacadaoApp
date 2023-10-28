import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";

import {
  LoginPages,
  HomePage,
  ControlPage,
  UserPage,
  EmployeePage,
  CollectorPage,
  ReportPage,
} from "../pages";
import { AuthProvider, AuthContext } from "../contexts/AuthContext";
import { CadastroUserProvider } from "../contexts/CadastroUserContext";
import { CadastroEmpProvider } from "../contexts/CadastroEmpContext";
import { CadastroColleProvider } from "../contexts/CadastroColleContext";
import { ControlProvider } from "../contexts/ControlContext";

// import { NaveBar } from "../components";
interface PrivateProps {
  children: React.ReactElement;
}

export const AppRoutes = () => {
  const Private = ({ children }: PrivateProps) => {
    const { isAuthenticated } = useContext(AuthContext);
    console.log(isAuthenticated);
    // if (loading) {
    //   //TODO: corrigir loading na pasta AuthContext..
    //   return <div>Em Carregamento...</div>;
    // }
    // const tempIsAuthenticated = true; //TODO: remover...
    if (!isAuthenticated) {
      console.log("entrei aqui antes");
      return <Navigate to="/atacadaoApp/Login" />;
    }
    return children;
  };

  return (
    <Router>
      <AuthProvider>
        <ControlProvider>
          <CadastroUserProvider>
            <CadastroEmpProvider>
              <CadastroColleProvider>
                <Routes>
                  <Route path="atacadaoApp/Login" element={<LoginPages />} />

                  <Route path="atacadaoApp/Users" element={<UserPage />} />
                  <Route
                    path="atacadaoApp/Controls"
                    element={<ControlPage />}
                  />
                  <Route
                    path="atacadaoApp/Employees"
                    element={<EmployeePage />}
                  />
                  <Route
                    path="atacadaoApp/Collectors"
                    element={<CollectorPage />}
                  />
                  <Route
                    path="atacadaoApp/ReportPage"
                    element={<ReportPage />}
                  />
                  <Route
                    path="atacadaoApp/"
                    element={
                      <Private>
                        <HomePage />
                      </Private>
                    }
                  />
                </Routes>
              </CadastroColleProvider>
            </CadastroEmpProvider>
          </CadastroUserProvider>
        </ControlProvider>
      </AuthProvider>
    </Router>
  );
};
