import styled from "styled-components";

export const StyledWrapper = styled.section`
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: var(--secondary);
  margin: 20px;
  min-height: 400px;
  min-width: 300px;
  box-shadow: 0 0 2px 1px #00000086;

  & h1 {
    margin: 10px;
    color: var(--on-secondary);
    text-shadow: 1px 1px 2px #0000006f;
  }
`;
