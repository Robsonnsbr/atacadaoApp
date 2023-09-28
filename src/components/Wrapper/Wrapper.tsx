import { ReactNode } from "react";
import * as S from "./Wrapper.style";

interface WrapperProps {
  children: ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  return <S.StyledWrapper>{children}</S.StyledWrapper>;
};
