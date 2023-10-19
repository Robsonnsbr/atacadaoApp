import styled from "styled-components";

export const StyledWrapper = styled.section`
  border-radius: 6px;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  background-color: var(--secondary);
  margin: 20px;
  min-height: 400px;
  min-width: 996px;
  box-shadow: 0 0 2px 1px #00000086;
  flex-direction: row;

  & .containerCadastro {
  min-width: 310px;
  margin: 20px 0px;
  }

  & .tabelaContainer {
    margin: 20px 0px;
    position: relative;
  }
  
  @media (max-width: 855px) {
    min-width: 300px;
    flex-direction: column;

    .containerCadastro {
      margin: 0px;
  }
    
    .tabelaContainer {
      margin: 0px;
  }
  }

  & p#warning {
    text-align: center;
    margin: 0;
    margin-Bottom: 5px;
    padding: 0px;
    width: 472px;
    height: 37px;
  }

  & .warningTable {
    color: var(--error);
    text-align: center;
    margin: 0;

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