import styled from "styled-components";

export const UserTableStyle = styled.table`


/* Estilização da tabela de dados */
table {  
  border-radius: 6px;
  background-color: var( --secondary);
  width: 100%;
  border-collapse: collapse;
  /* align-items: center; */
  /* justify-content: center; */
  /* width: 100vw; */
  /* margin: 30px; */
}

/* Estilo das células do cabeçalho da tabela */
th {
  background-color: var(--primary);
  font-weight: bold;
  border: 1px solid #ddd;
  padding: 10px;
}

/* Estilo das células de dados da tabela */
td {
  border: 1px solid #ddd;
  padding: 10px;
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
