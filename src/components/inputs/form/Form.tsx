import { ReactElement } from "react";
import * as S from "./Form.style";

interface FormProps {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  method?: string;
  children: ReactElement | ReactElement[];
}

interface ContainerFieldProps {
  children: ReactElement | ReactElement[];
  className?: string;
}

export const Form = ({ onSubmit, method, children }: FormProps) => {
  return (
    <S.StyledForm onSubmit={onSubmit} method={method}>
      {children}
    </S.StyledForm>
  );
};

export const ContainerField = ({
  className,
  children,
}: ContainerFieldProps) => {
  return (
    <S.StyledContainerField className={className}>
      {children}
    </S.StyledContainerField>
  );
};
