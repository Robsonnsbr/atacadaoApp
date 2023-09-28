import styled from "styled-components";
import { ButtonProps } from "./Button";

type StyledProps = Pick<ButtonProps, "backgroundcolor">;

export const StyledContainerButton = styled.div<StyledProps>`
  border-radius: 3px;
  box-shadow: 0 0 2px 1px #00000086;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--third);
  margin: 5px;
  min-width: 101px;
  max-width: 101px;
  height: 40px;
`;

export const StyledButton = styled.button<StyledProps>`
  border-radius: 3px;
  font-size: 16px;
  padding: 5px;
  margin: 5px;
  background-color: ${(props) => props.backgroundcolor};
  color: var(--on-primary);
  box-shadow: 0px 0px 1px 1px #0000006f;
  transition: box-shadow 50ms, font-size 50ms color 50ms;
  min-width: 80px;
  max-height: 30px;
  align-items: center;
  justify-content: center;
  justify-self: auto;
  text-align: center;
  &:hover {
    font-size: 17px;
    box-shadow: 0px 0px 2px 2px #0000006f;
  }
  &:active {
    color: var(--secondary);
    background-color: ${(props) => props.backgroundcolor};
    box-shadow: 0px 0px 1px 1px #0000006f;
    box-shadow: inset 0 0 0 2em #0000006f;
    font-size: 16px;
  }
`;

export const StyledButtonRow = styled.div`
  justify-content: center;
  min-width: 100%;
  gap: 50px;
  display: flex;
  margin-top: 200px;
`;
