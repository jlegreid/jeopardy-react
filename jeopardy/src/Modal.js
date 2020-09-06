import React, { useContext } from 'react';
import { ModalContext } from './ModalProvider';
// import ReactDOM from "react-dom";

export function Modal(onClose, children) {
    // const modalNode = useContext(ModalContext);


    // return modalNode
    //     ? ReactDOM.createPortal(
    //         <div className="modal">
    //             {/* {children} */}
    //             <button className="action-button secondary" onClick={onClose}>Done</button>
    //         </div>,
    //         modalNode)
    //     : null;

    return (
        <div className="modal">
            ITS A MODAL
            <button className="action-button secondary" onClick={onClose}>Done</button>
        </div>
    )

};

export default Modal