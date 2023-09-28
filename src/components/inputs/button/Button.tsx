import * as S from "./Button.style";

export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  id: string;
  name?: string;
  value?: string;
  backgroundcolor?: string;
  onClick?: () => void;
}

export const Button = ({
  type,
  id,
  name,
  value,
  backgroundcolor,
  onClick,
}: ButtonProps) => {
  return (
    <S.StyledContainerButton>
      <S.StyledButton
        backgroundcolor={backgroundcolor}
        type={type}
        id={id}
        name={name}
        // value={value}
        onClick={onClick}
      >
        {value}
      </S.StyledButton>
    </S.StyledContainerButton>
  );
};
