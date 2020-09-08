import React, {useState, useEffect, useRef} from 'react';

const ModalContext = React.createContext();

function ModalProvider({ children }) {
    const modalRef = useRef();
    const [context, setContext] = useState();

    useEffect(() => {
        setContext(modalRef.current);
    }, [])

    return (
        <>
            <ModalContext.Provider value={context}>{children}</ModalContext.Provider>
            <div ref={modalRef} />
        </>
    )
}


export { ModalProvider, ModalContext };