import { ReactNode } from "react";
import * as S from "./Page.Style";

interface PageProps {
  children: ReactNode;
}

export const Page = ({ children }: PageProps) => {
  return <S.StyledPage>{children}</S.StyledPage>;
};
