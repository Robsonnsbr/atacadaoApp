import styled from "styled-components";

export const StyledNaveBar = styled.nav`
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: var(--secondary); /* Cor de fundo da navbar */
  color: #fff; /* Cor do texto na navbar */
  padding: 15px 0; /* Espaçamento interno no topo e na parte inferior */
  z-index: 100; /* Define a ordem de empilhamento para que a navbar esteja na frente de outros elementos */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  justify-items: center;
  gap: 20px; /* Espaçamento horizontal entre os links */
  box-shadow: 0 0 2px 1px #00000086;


  & a {
    text-decoration: none;
    color: var(--on-secondary);
    margin-left: 40px;
  }
  & a:hover {
    color: var(--third);
  }
`;
