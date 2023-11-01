import styled from "styled-components";

// import 'bootstrap/dist/css/bootstrap.min.css'

//TODO: Ajustar tamanho mínimo do navBar após definição de atalhos
export const StyledNaveBar = styled.nav`
  width: 100%;
  height: 55px;
  overflow: visible;
  position: fixed;
  top: 0;
  justify-content: center;
  margin: auto;
  background-color: var(--secondary); /* Cor de fundo da navbar */
  color: #fff; /* Cor do texto na navbar */
  padding: 15px 0; /* Espaçamento interno no topo e na parte inferior */
  z-index: 100; /* Define a ordem de empilhamento para que a navbar esteja na frente de outros elementos */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  justify-items: center;
  gap: 20px; /* Espaçamento horizontal entre os links */
  box-shadow: 0 0 2px 1px #00000086;

  & button {
    font: inherit;
    background-color: var(--secondary);
  }

  & a {
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    text-shadow: var(--text-shadow-style);
    color: var(--on-secondary);
    margin-left: 40px;
    @media(max-width: 1000px) {
      margin-left: 30px;
    }
    @media(max-width: 950px) {
      margin-left: 20px;
    }
  }
  & a:hover {
    color: var(--third);
  }

  & div .logo {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 5px;
    img {
      max-width: 180px;
    }
  }

  & span {
    font-size: 16px;
    font-weight: 500;
    margin-right: 10px;
    overflow-y: hidden;
    overflow-x: hidden; /* Impede a rolagem horizontal */
    max-width: 180px;
    white-space: nowrap; /* Impede que o texto quebre para a próxima linha */
    text-overflow: ellipsis;
    color: var(--successfully);
    position: absolute;
    right: 0;
    @media (max-width: 850px) {
      left: 170px;
    }
  }


  .linksNavbar {
    display: block;
    @media (max-width: 850px) {
      display: none;
    }
  }
  

/* Estilos para o SelectNavbar */
.SelectNavbar {
  display: none;
  @media (max-width: 850px) {
    display: block;
  }
}

/* Estilos para o Select */
.SelectNavbar select {
  position:relative;
  top: -6px;
  left: 60px;
  outline: none;
  appearance: none;
  width: 100%;
  padding: 10px;
  margin: 0px;
  font-size: 16px;
  box-shadow: 0 0 2px 1px #00000086;
  border-radius: 6px;
  background-color: var(--third);
  &:hover {
  border: 1px solid #000;
}
}
/* Estilos para as opções do Select */
.SelectNavbar select option {
  background-color: var(--on-primary);
}

/* Estilo para a opção padrão */
.SelectNavbar select option[value=""] {
  font-style: italic;
}


  
`;
