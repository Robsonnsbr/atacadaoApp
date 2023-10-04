import { ReactNode } from "react";
import * as S from "./Main.Style";

interface MainProps {
  children: ReactNode;
}

export const Main = ({ children }: MainProps) => {
  return <S.StyledMain>{children}</S.StyledMain>;
};
