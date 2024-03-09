import React, { useContext, useEffect, useState } from 'react';
import styles from '../components/SCSS/aside.module.scss';
import { FilterContext } from '../components/context/FilterContext';

const Aside = () => {
  const [filterData, setFilterData] = useState([]);
  const [error, setError] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const { selectedCheckboxes, setSelectedCheckboxes } = useContext(FilterContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9080/filters.php');
        if (!response.ok) {
          throw new Error('Error en la solicitud al servidor');
        }

        const jsonData = await response.json();
        setFilterData(jsonData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const toggleCategoryExpansion = (category) => {
    setExpandedCategories((prevExpandedCategories) => {
      if (prevExpandedCategories.includes(category)) {
        return prevExpandedCategories.filter((cat) => cat !== category);
      } else {
        return [...prevExpandedCategories, category];
      }
    });
  };

  const handleCheckboxChange = (category, key, description) => {
    if (setSelectedCheckboxes) {
      setSelectedCheckboxes((prevSelectedCheckboxes) => {
        const updatedCheckboxes = {
          ...prevSelectedCheckboxes,
          [category]: {
            ...(prevSelectedCheckboxes[category] || {}),
            [key]: !prevSelectedCheckboxes[category]?.[key] ? description : undefined,
          },
        };

        if (!updatedCheckboxes[category][key]) {
          delete updatedCheckboxes[category][key];
        }
        
        if (Object.keys(updatedCheckboxes[category]).length === 0) {
          delete updatedCheckboxes[category];
        }
        return updatedCheckboxes;
      });
    }
  };

  

  const renderCheckboxList = (filterValues, keyName, category) => {
    const filteredValues = filterValues.filter((filter) => filter[keyName]);
    const isExpanded = expandedCategories.includes(category);

    if (filteredValues.length > 0) {
      return (
        <div key={category}>
          <h3>{category}</h3>
          <ul>
            {filteredValues.slice(0, isExpanded ? undefined : 3).map((filter) => (
              <li key={filter[keyName]}>
                <input
                  type="checkbox"
                  id={filter[keyName]}
                  name={filter[keyName]}
                  checked={selectedCheckboxes[category]?.[filter[keyName]] !== undefined}
                  onChange={() => handleCheckboxChange(category, filter[keyName], filter.descripcio || filter.nom || filter.capacitat || filter.model || filter.polzades)}
                />
                <label htmlFor={filter[keyName]}>
                  {filter.descripcio || filter.nom || filter.capacitat || filter.model || filter.polzades}
                </label>
              </li>
            ))}
          </ul>
          <button onClick={() => toggleCategoryExpansion(category)}>
            {isExpanded ? 'Mostrar menos -' : 'Mostrar más +'}
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <aside className={styles.aside}>
      <h2>Filtros</h2>
      {error ? (
        <p>Error al obtener datos: {error}</p>
      ) : (
        <div>
          {Object.entries(filterData).map(([filterType, filterValues]) => (
            <div key={filterType}>
              {renderCheckboxList(filterValues, 'tid', filterType)}
              {renderCheckboxList(filterValues, 'mid', filterType)}
              {renderCheckboxList(filterValues, 'eid', filterType)}
              {renderCheckboxList(filterValues, 'procid', filterType)}
              {renderCheckboxList(filterValues, 'rid', filterType)}
              {renderCheckboxList(filterValues, 'polid', filterType)}
              {renderCheckboxList(filterValues, 'gid', filterType)}
            </div>
          ))}
        </div>
      )}
    </aside>
  );
};

export default Aside;




// import React, { useContext, useEffect, useState, useMemo, useCallback } from 'react';
// import styles from '../components/SCSS/aside.module.scss';
// import { FilterContext } from '../components/context/FilterContext';

// const Aside = () => {
//   const [filterData, setFilterData] = useState([]);
//   const [error, setError] = useState(null);
//   const [expandedCategories, setExpandedCategories] = useState([]);
//   const { selectedCheckboxes, setSelectedCheckboxes } = useContext(FilterContext);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:9080/filters.php');
//         if (!response.ok) {
//           throw new Error('Error en la solicitud al servidor');
//         }

//         const jsonData = await response.json();
//         setFilterData(jsonData);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchData();
//   }, []);

//   const toggleCategoryExpansion = (category) => {
//     setExpandedCategories((prevExpandedCategories) => {
//       if (prevExpandedCategories.includes(category)) {
//         return prevExpandedCategories.filter((cat) => cat !== category);
//       } else {
//         return [...prevExpandedCategories, category];
//       }
//     });
//   };

//   const handleCheckboxChange = useCallback((category, key, description) => {
//     if (setSelectedCheckboxes) {
//       setSelectedCheckboxes((prevSelectedCheckboxes) => {
//         const updatedCheckboxes = {
//           ...prevSelectedCheckboxes,
//           [category]: {
//             ...(prevSelectedCheckboxes[category] || {}),
//             [key]: !prevSelectedCheckboxes[category]?.[key] ? description : undefined,
//           },
//         };

//         if (!updatedCheckboxes[category][key]) {
//           delete updatedCheckboxes[category][key];
//         }

//         if (Object.keys(updatedCheckboxes[category]).length === 0) {
//           delete updatedCheckboxes[category];
//         }
//         return updatedCheckboxes;
//       });
//     }
//   }, [setSelectedCheckboxes]);

//   const renderCheckboxList = useMemo(
//     () => (filterValues, keyName, category) => {
//       const filteredValues = filterValues.filter((filter) => filter[keyName]);
//       const isExpanded = expandedCategories.includes(category);

//       if (filteredValues.length > 0) {
//         return (
//           <div key={category}>
//             <h3>{category}</h3>
//             <ul>
//               {filteredValues.slice(0, isExpanded ? undefined : 3).map((filter) => (
//                 <li key={filter[keyName]}>
//                   <input
//                     type="checkbox"
//                     id={filter[keyName]}
//                     name={filter[keyName]}
//                     checked={selectedCheckboxes[category]?.[filter[keyName]] !== undefined}
//                     onChange={() =>
//                       handleCheckboxChange(category, filter[keyName], filter.descripcio || filter.nom || filter.capacitat || filter.model || filter.polzades)
//                     }
//                   />
//                   <label htmlFor={filter[keyName]}>
//                     {filter.descripcio || filter.nom || filter.capacitat || filter.model || filter.polzades}
//                   </label>
//                 </li>
//               ))}
//             </ul>
//             <button onClick={() => toggleCategoryExpansion(category)}>
//               {isExpanded ? 'Mostrar menos -' : 'Mostrar más +'}
//             </button>
//           </div>
//         );
//       }

//       return null;
//     },
//     [expandedCategories, selectedCheckboxes, handleCheckboxChange]
//   );

//   const memoizedFilterLists = useMemo(() => {
//     return Object.entries(filterData).map(([filterType, filterValues]) => (
//       <div key={filterType}>
//         {renderCheckboxList(filterValues, 'tid', filterType)}
//         {renderCheckboxList(filterValues, 'mid', filterType)}
//         {renderCheckboxList(filterValues, 'eid', filterType)}
//         {renderCheckboxList(filterValues, 'procid', filterType)}
//         {renderCheckboxList(filterValues, 'rid', filterType)}
//         {renderCheckboxList(filterValues, 'polid', filterType)}
//         {renderCheckboxList(filterValues, 'gid', filterType)}
//       </div>
//     ));
//   }, [filterData, renderCheckboxList]);

//   return (
//     <aside className={styles.aside}>
//       <h2>Filtros</h2>
//       {error ? (
//         <p>Error al obtener datos: {error}</p>
//       ) : (
//         <div>{memoizedFilterLists}</div>
//       )}
//     </aside>
//   );
// };

// export default React.memo(Aside);
