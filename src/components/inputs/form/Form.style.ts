import styled from "styled-components";

export const StyledForm = styled.form`
  color: var(--on-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px;
  min-width: 350px;

  & label {
    text-shadow: var(--text-shadow-style);
  }

  & input {
    min-width: 300px;
  }
`;

export const StyledContainerField = styled.div`
  border-radius: 6px;
  font-size: 20px;
  font-weight: 600;
  display: grid;
  justify-content: center;
  margin: 5px;
  background-color: var(--third);
  padding: 5px;
  box-shadow: 0 0 2px 1px #00000086;

  & input {
    background-color: var(--secondary);
    border-radius: 3px;
    color: var(--on-secondary);
    font-size: 16px;
    padding: 5px;
    text-align: center;
    box-shadow: inset 0 0 1px 1px #00000086;
    outline: none;
  }
  & input:focus {
    background-color: var(--on-primary);
  }
`;
