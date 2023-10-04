import styled from "styled-components";

export const StyledNaveBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--third-transparent); /* Cor de fundo da navbar */
  color: #fff; /* Cor do texto na navbar */
  padding: 20px 0; /* Espaçamento interno no topo e na parte inferior */
  z-index: 100; /* Define a ordem de empilhamento para que a navbar esteja na frente de outros elementos */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  justify-items: center;
  gap: 20px; /* Espaçamento horizontal entre os links */

  & a {
    text-decoration: none;
    color: var(--on-secondary);
    margin-left: 40px;
  }
  & a:hover {
    color: var(--third);
  }
`;
