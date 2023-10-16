import styled from "styled-components";

export const StyledWrapper = styled.section`
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--secondary);
  margin: 20px;
  min-height: 400px;
  min-width: 300px;
  box-shadow: 0 0 2px 1px #00000086;
  flex-direction: row;
  
  @media (max-width: 855px) {
    flex-direction: column;
  }

  & p {
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    margin: 0;
    margin-Bottom: 5px;
    padding: 0px;
  }

  & .warning-null {
    color: transparent;
  }
  & .error-true {
    text-shadow: var(--text-shadow-style);
    color: var(--error);
  }
  & .error-false {
    color: var(--successfully);
  }

`;