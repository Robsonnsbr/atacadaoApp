import styled from "styled-components";

export const UserTableStyleContainer = styled.div`
box-shadow: inset 0px 0px 5px 1px rgb(000,000,000, 0.3);
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

  &::-webkit-scrollbar {
    border-radius: 0px 10px 10px 0px;
    background-color: var(--primary);
    box-shadow: inset 0px 0px 2px 0px rgb(000,000,000, 0.3);
  }
  
  &::-webkit-scrollbar-thumb {
    border-radius: 0px 10px 10px 0px;
    border: 1px solid var(--primary);
    background-color: #ccc;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #bbb;
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
  box-shadow: inset 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  top: 47px;
  border-radius: 10px 10px 0px 0px;
  z-index: 1;
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
  box-shadow: inset 0 -10px 10px -10px rgba(0, 0, 0, 0.5);
  bottom: 124px;
  border-radius: 0px 0px 10px 10px;
  @media (max-width: 855px) {
    margin: 5px;
    bottom: 0px;
  }
  @media (max-width: 400px) {
    margin: 5px;
    bottom: 10px;
  }

`;


//TODO: corrigir sombra bottom ela deve sumir ao remover scroll.
export const UserTableStyle = styled.table`
  /* Estilo das células do cabeçalho da tabela */
  th {
    background-color: var(--primary);
    font-weight: bold;
    border: 1px solid #ccc;
    padding: 2px;
  }

  /* Estilo das células de dados da tabela */
  td {
    border: 1px solid #ccc;
    padding: 0px 10px;
    justify-content: center;
  }

  tr:nth-child(even) td {
    background-color: var(--primary);
  }

  tr:nth-child(odd) td {
    background-color: var(--secondary);
  }

  & .info {
    min-width: 160px;
    max-width: 160px;
    white-space: nowrap;
    overflow: auto;

  }

  & .info-num-collector {
    min-width: 90px;
  }

  & .info-sn-collector {
    min-width: 220px;
  }
  & .info-activeUser {
    min-width: 200px;
    p {
      margin: 3px;
    }
  }

  & .actions {
    min-width: 132px;
    white-space: nowrap;
  }

  & .info::-webkit-scrollbar {
    border-radius: 5px;
    height: 7px;
    background-color: var(--primary);
    box-shadow: var(--text-shadow-style);
  }

  & .info::-webkit-scrollbar-track:hover {
    border-radius: 5px;
    background-color: #bbb;
  }

  & .info::-webkit-scrollbar-thumb {
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 1);
    border-radius: 5px;
    border: 2px solid var(--successfully);
    background-color: var(--successfully);
  }

  & .info::-webkit-scrollbar-thumb:hover {
    background-color: var(--third);
  }
`;
