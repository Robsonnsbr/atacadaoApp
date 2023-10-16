import styled from "styled-components";

export const UserTableStyleContainer = styled.div`
    max-height: 424px;
    overflow-y: auto;
    position: relative;
    margin: 5px;
    margin: 20px;
    margin-right: 40px;
    margin-bottom: 45px;


  & table {
    min-width: 443px;
    margin: 5px;
    background-color: var( --secondary);
    border-collapse: separate;
    border-spacing: 5px; 
    border-radius: 10px;
    box-shadow: 0 0 2px 1px #00000086;

  }

`

export const UserTableStyle = styled.table`


/* Estilo das células do cabeçalho da tabela */
th {
  /* position: fixed; */ //TODO: Colocar uma posição fixa para o header da tabela.
  background-color: var(--primary);
  font-weight: bold;
  border: 1px solid #ddd;
  padding: 5px;
  /* border-radius: 10px; */
}

/* Estilo das células de dados da tabela */
td {
  border: 1px solid #ddd;
  padding: 5px;
  /* border-radius: 10px; */
}

/* Estilização das linhas alternadas (para facilitar a leitura) */
tr:nth-child(even) {
  background-color: #f2f2f2;
}

/* Estilização das células de cabeçalho e dados "Name" */
th:nth-child(2),
td:nth-child(2) {
  width: 30%;
}

/* Estilização das células de cabeçalho e dados "Matrícula" */
th:nth-child(4),
td:nth-child(4) {
  width: 20%;
}

/* Estilização das células de cabeçalho e dados "Password" */
th:nth-child(6),
td:nth-child(6) {
  width: 20%;
}

`;
