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

    if (!isAuthenticated) {
      console.log("entrei aquui antes");
      return <Navigate to="/AppCollector/Login" />;
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
                  <Route path="AppCollector/login" element={<LoginPages />} />

                  <Route path="AppCollector/Users" element={<UserPage />} />
                  <Route
                    path="AppCollector/Controls"
                    element={<ControlPage />}
                  />
                  <Route
                    path="AppCollector/Employees"
                    element={<EmployeePage />}
                  />
                  <Route
                    path="AppCollector/Collectors"
                    element={<CollectorPage />}
                  />
                  <Route
                    path="AppCollector/ReportPage"
                    element={
                      <Private>
                        <ReportPage />
                      </Private>
                    }
                  />
                  <Route
                    path="AppCollector/"
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
