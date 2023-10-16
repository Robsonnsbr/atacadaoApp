import styled from "styled-components";

export const StyledContainerModal = styled.div`
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  
  .modal-content {
    background: var(--secondary);
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    width: 300px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    
  }

  .buttons {
    display: inline-flex;
    gap:20px
  }
  
  p {
    word-spacing: 2px;
  }

  `