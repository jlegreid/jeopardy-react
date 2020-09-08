import React from 'react';

function Shapes({children}) {
  return (
    <div className="inner-shape-1">
      <div className="inner-shape-2">
        <div className="inner-shape-3">
          {children}
        </div>
      </div>
    </div>
  );
} 

export default Shapes    