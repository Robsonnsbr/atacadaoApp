import styled from "styled-components";

export const StyledForm = styled.form`
  color: var(--on-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px;
  /* min-width: 350px; */

  @media (max-width: 855px) {
      margin: 5px;
  }

  & label {
    color:  var(--on-secondary);
    text-shadow: var(--text-shadow-style);
    font-size: 13px;

  }

  /* Estilo para a div que contém os checkboxes */
div.checkBox {
  display: flex;
  align-items: center;
  /* gap: 10px; */

  /* Estilo para os rótulos */
label {
  margin: 10px; /* Espaço entre o rótulo e o checkbox */
  font-weight: bold; /* Texto em negrito */
  cursor: pointer;
}

/* Estilo para os checkboxes */
input[type="checkbox"] {
  cursor: pointer;
  margin-right: 5px; //Espaço entre os checkboxes
  transform: scale(1.5); /* Aumenta o tamanho dos checkboxes */
}
}


  & input#confirmarPassword, #password {
    align-items: center;
    min-width: 275px;
  }



  .inputName {
  margin-bottom: 20px;
  }
  .inputMat {
    margin-bottom: 20px;
  }
  .inputCPF {
    margin-bottom: 20px;
  }
  .inputPass {
    margin-bottom: 20px;
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
  min-height: 41.4px;

  & input, select{
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    min-width: 300px;
    outline: none;
    background-color: transparent;
    color: var(--on-secondary);
    font-size: 16px;
    padding: 5px;
    text-align: left;
    border-radius: 3px 3px 0px 0px;
    /* box-shadow: inset 0 0 1px 1px #00000086; */
    border-bottom: 1px solid var(--on-secondary);
  }

  & select {
    appearance: auto;
  }


  & input:focus {
    background-color: var(--secondary);
  }
  



  & .btnViewPassword {
    background-color:transparent;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font: inherit;
    cursor: pointer;
    outline: none;
    height: 20px;
    img {
      padding: 0px;
      color: transparent;
      width: 20px;
    }
  }
`;
