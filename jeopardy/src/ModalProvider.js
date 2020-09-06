import React, {useState, useEffect, useRef} from 'react';

const ModalContext = React.createContext();

function ModalProvider({ context, children }) {
    // const modalRef = useRef();
    // const [context, setContext] = useState();

    // useEffect(() => {
    //     setContext(modalRef.current);
    // }, [])

    return (
        <ModalContext.Provider value={context}>{children}
            {/* <div ref={modalRef} /> */}
        </ModalContext.Provider>
    )
}


export { ModalProvider, ModalContext };