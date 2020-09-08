import React from 'react';

const ClueContext = React.createContext();

function ClueProvider({ context, children }) {
  return (
    <ClueContext.Provider value={context}>{children}</ClueContext.Provider>
  );
}

export { ClueProvider, ClueContext };
