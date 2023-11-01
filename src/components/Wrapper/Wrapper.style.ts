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

  & .warningLogin {
    text-align: center;
    }
  

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
  

  & #warning {
    text-align: center;
    margin: auto;
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

  .logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  padding: 5px;
}

.logo img {
  max-width: 500px;
}
.logo img {
  max-width: 500px;
}

@media (max-width: 855px) {
  .logo img {
  max-width: 300px;
}
}


`;