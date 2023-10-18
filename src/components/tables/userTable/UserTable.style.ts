import styled from "styled-components";

export const UserTableStyleContainer = styled.div`
  max-height: 424px;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  margin: 20px 40px 45px;
  padding: 15px 0;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: var(--secondary);
  @media (max-width: 855px) {
    margin: 5px;
  }

`;

export const ShadowTop = styled.div`
  display: none;  
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 10px;
  margin-left: 40px;
  margin-right: 40px;
  box-shadow: inset 0 10px 10px -10px rgba(0, 0, 0, 0.2);
  top: 49px;
  border-radius: 10px 0px 0px 0px;
  z-index: 1; /* Adicionamos uma z-index para manter a sombra superior acima da rolagem */
  @media (max-width: 855px) {
    margin: 5px;
    top: 29px;
  }
`;
export const ShadowBottom = styled.div`
  display: none; 
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 10px;
  margin-left: 40px;
  margin-right: 40px;
  box-shadow: inset 0 -10px 10px -10px rgba(0, 0, 0, 0.2);
  bottom: 135px;
  border-radius: 0px 0px 0px 10px;
  @media (max-width: 855px) {
    margin: 5px;
    bottom: 0px;
  }

`;


//TODO: corrigir sombra bottom ela deve sumir ao remover scroll.
export const UserTableStyle = styled.table`
  /* Estilo das células do cabeçalho da tabela */
  th {
    background-color: var(--primary);
    font-weight: bold;
    border: 1px solid #ddd;
    padding: 2px;
  }

  /* Estilo das células de dados da tabela */
  td {
    border: 1px solid #ddd;
    padding: 0px 10px;
  }

  & .information {
    min-width: 160px;
    max-width: 160px;
    white-space: nowrap;
    overflow: auto;
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
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 1);
    border-radius: 5px;
    border: 2px solid var(--successfully);
    background-color: var(--successfully);
  }

  & .information::-webkit-scrollbar-thumb:hover {
    background-color: var(--third);
  }
`;
