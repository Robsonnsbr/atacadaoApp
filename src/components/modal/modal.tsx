import React from "react";
import { StyledContainerModal } from "./Modal.Style";
import { Button } from "..";

interface ModalProps {
  isOpen: boolean;
  isButtonOff: boolean;
  message: string | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  isButtonOff,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <StyledContainerModal>
      <div className="modal">
        <div className="modal-content">
          <p>{message}</p>
          {!isButtonOff && (
            <div className="buttons">
              <Button
                backgroundcolor="var(--successfully)"
                value="Confirmar"
                onClick={onConfirm}
              ></Button>
              <Button
                backgroundcolor="var(--buttonDelete)"
                value="Cancelar"
                onClick={onCancel}
              ></Button>
            </div>
          )}
        </div>
      </div>
    </StyledContainerModal>
  );
};
