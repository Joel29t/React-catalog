// FilterContext.jsx
import React, { createContext, useState } from 'react';

const FilterContext = createContext(null);

const FilterProvider = ({ children }) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});

  return (
    <FilterContext.Provider value={{ selectedCheckboxes, setSelectedCheckboxes }}>
      {children}
    </FilterContext.Provider>
  );
};

export { FilterProvider, FilterContext };