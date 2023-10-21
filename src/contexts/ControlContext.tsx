import { createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { User } from "../@types/User";
// import userTest from "./userTest.json";

interface CustomError {
  hasError: boolean;
  msg: string;
}

interface IPropsCadastro {
  error: CustomError | null;
  cadastro: (
    name: string,
    mat: string,
    confirmMat: string,
    password: string,
    confirmPassword: string,
    cpf: string
  ) => void;
}

interface CadastroProviderProps {
  children: JSX.Element;
}

const initialProps: IPropsCadastro = {
  error: {
    hasError: false,
    msg: "",
  },
  cadastro: () => {
    throw new Error("Function not implemented.");
  },
};

export const ControlContext = createContext<IPropsCadastro>(initialProps);

export const ControlProvider = ({ children }: CadastroProviderProps) => {
  // const navigate = useNavigate();
  const [error, setError] = useState<CustomError | null>(null);

  const validityCPF = (cpf: string) => {
    cpf = cpf.replace(/[^\d]/g, ""); // Remove caracteres não numéricos

    if (cpf.length !== 11) {
      setError({
        hasError: true,
        msg: "Um CPF válido deve ter 11 dígitos",
      });
      return false;
    }

    // Verifica se todos os dígitos são iguais; se sim, é considerado inválido
    if (/^(\d)\1+$/.test(cpf)) {
      setError({
        hasError: true,
        msg: "CPF Inválido!",
      });
      return false;
    }

    // Calcula o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    const primeiroDigito = (soma * 10) % 11;

    // Calcula o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    const segundoDigito = (soma * 10) % 11;

    // Verifica se os dígitos verificadores calculados coincidem com os dígitos no CPF

    if (
      primeiroDigito === parseInt(cpf.charAt(9)) &&
      segundoDigito === parseInt(cpf.charAt(10))
    ) {
      // Verificar se o cpf já está em uso
      const recoveredUsers = localStorage.getItem("users_db");
      if (recoveredUsers) {
        const hasRecoveredUsers = JSON.parse(recoveredUsers);
        const hasUser = hasRecoveredUsers.filter(
          (user: User) => user.cpf === cpf
        );
        if (hasUser.length > 0) {
          setError({
            hasError: true,
            msg: "Ops, parece que o cpf já está cadastrado.",
          });
          return false;
        }
        return true;
      }
    }
    setError({
      hasError: true,
      msg: "CPF Inválido!",
    });
    return true;
  };

  const validityPassword = (password: string) => {
    if (password) {
      const hasSpecial = /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(password);
      const hasUppercase = /[A-Z]/.test(password);

      if (!hasUppercase) {
        setError({
          hasError: true,
          msg: "Senha inválida! A senha deve conter ao menos uma letra maiúscula",
        });
        return false;
      }
      if (!hasSpecial) {
        setError({
          hasError: true,
          msg: 'Senha inválida! A senha deve conter ao menos um caractere especial"(!@#$&...*)"',
        });
        return false;
      }
      if (password.length < 8) {
        setError({
          hasError: true,
          msg: "Senha inválida! A senha deve conter ao menos 8 caracteres",
        });
        return false;
      }
      if (password.length > 20) {
        setError({
          hasError: true,
          msg: "Senha inválida! A senha deve conter no máximo 20 caracteres",
        });
        return false;
      }
      return true;
    }
  };

  const cadastro = async (
    name: string,
    mat: string,
    confirmMat: string,
    password: string,
    confirmePassword: string,
    cpf: string
  ) => {
    if (mat === confirmMat && password === confirmePassword) {
      setError(null);

      if (validityPassword(password) && validityCPF(cpf)) {
        const recoveredUsers = localStorage.getItem("users_db");

        if (recoveredUsers) {
          const hasRecoveredUsers = JSON.parse(recoveredUsers);
          const hasUser = hasRecoveredUsers.filter(
            (user: User) => user.mat === mat
          );

          if (hasUser.length > 0) {
            return setError({
              hasError: true,
              msg: "Ops, parece que a matrícula já está cadastrada.",
            });
          }
        }

        if (recoveredUsers) {
          const parsedRecoveredUsers: User[] = JSON.parse(recoveredUsers);
          parsedRecoveredUsers.push({ name, mat, password, cpf });
          localStorage.setItem(
            "users_db",
            JSON.stringify(parsedRecoveredUsers)
          );
        } else {
          localStorage.setItem(
            "users_db",
            JSON.stringify([{ name, mat, password, cpf }])
          );
        }
        // const usersTestConvert = JSON.stringify(userTest);
        // localStorage.setItem("users_db", usersTestConvert);
        setError({
          hasError: false,
          msg: "Seu cadastro foi concluído com sucesso.",
        });
      }

      // return navigate("/AppCollector/login");
    } else {
      return setError({
        hasError: true,
        msg: "Os dados inseridos não estão corretos. Verifique novamente.",
      });
    }
  };

  return (
    <ControlContext.Provider
      value={{
        error,
        cadastro,
      }}
    >
      {children}
    </ControlContext.Provider>
  );
};
