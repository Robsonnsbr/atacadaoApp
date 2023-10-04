import { ReactNode } from "react";
import * as S from "./PageContent.Style";

interface MainProps {
  children: ReactNode[];
}

export const PageContent = ({ children }: MainProps) => {
  return <S.StyledMain>{children}</S.StyledMain>;
};
