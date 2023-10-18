import styled from "styled-components";

export const UserTableStyleContainer = styled.div`
    max-height: 424px;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    margin-top: 20px;
    margin-right: 40px;
    margin-bottom: 45px;
    
    
  @media (max-width: 855px) {
    margin: 5px;
  }
    
  & table {
    min-width: 443px;
    margin: 5px;
    background-color: var( --secondary);
    border-collapse: separate;
    border-spacing: 5px; 
    border-radius: 10px;
    box-shadow: 0 0 2px 1px #00000086;

  }

  & p {
    color: var(--error);
    margin: 20px;
    text-align: center;
  }

`

export const UserTableStyle = styled.table`


/* Estilo das células do cabeçalho da tabela */
th {
  /* position: fixed; */ //TODO: Colocar uma posição fixa para o header da tabela.
  background-color: var(--primary);
  font-weight: bold;
  border: 1px solid #ddd;
  padding: 2px;
  /* border-radius: 10px; */
}

/* Estilo das células de dados da tabela */
td {
  border: 1px solid #ddd;
  padding: 0px;
  padding-inline: 10px;
  /* border-radius: 10px; */
}

& .information {
  min-width: 160px;
  max-width: 160px;
  white-space: nowrap;
  overflow:auto;
}

& .information::-webkit-scrollbar {
  border-radius: 5px;
  height: 10px;
  background-color: var(--primary);
  box-shadow: var(--text-shadow-style);
}


& .information::-webkit-scrollbar-track:hover {
  border-radius: 5px;
  background-color: #B8C0C2;
}


& .information::-webkit-scrollbar-thumb {
  box-shadow: 0px 0px 1px rgb(000, 000, 000, 1);
  border-radius: 5px;
  border: 2px solid var(--successfully);
  background-color: var(--successfully);
}

 & .information::-webkit-scrollbar-thumb:hover {
  background-color: var(--third);
} 





/* Estilização das linhas alternadas (para facilitar a leitura) */
/* tr:nth-child(even) {
  background-color: #f2f2f2;
} */

/* Estilização das células de cabeçalho e dados "Name" */
/* th:nth-child(2),
td:nth-child(2) {
  width: 30%;
} */

/* Estilização das células de cabeçalho e dados "Matrícula" */
/* th:nth-child(4),
td:nth-child(4) {
  width: 20%;
} */

/* Estilização das células de cabeçalho e dados "Password" */
/* th:nth-child(6),
td:nth-child(6) {
  width: 20%;
} */

`;
