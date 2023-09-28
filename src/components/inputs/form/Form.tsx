import { ReactElement } from "react";
import * as S from "./Form.style";

interface FormProps {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  method?: string;
  children: ReactElement[];
}

interface ContainerFieldProps {
  children: ReactElement[];
}

export const Form = ({ onSubmit, method, children }: FormProps) => {
  return (
    <S.StyledForm onSubmit={onSubmit} method={method}>
      {children}
    </S.StyledForm>
  );
};

export const ContainerField = ({ children }: ContainerFieldProps) => {
  return <S.StyledContainerField>{children}</S.StyledContainerField>;
};
