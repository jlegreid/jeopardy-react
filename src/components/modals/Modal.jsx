import React, { useContext } from 'react';
import { ModalContext } from './ModalProvider';
import ReactDOM from 'react-dom';

export function Modal({ children, ...props }) {
  // Gets the modalRef from the ModalContext and sets the modalNode equal to it, so the modal knows where to mount
  const modalNode = useContext(ModalContext);

  return modalNode
    ? ReactDOM.createPortal(
        <div className={'modal ' + props.classes}>{children}</div>,
        modalNode,
      )
    : null;
}

export default Modal;
