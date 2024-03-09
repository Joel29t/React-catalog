import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../components/context/ProductContext';
import { FilterContext } from '../components/context/FilterContext';
import styles from '../components/SCSS/content.module.scss';
import Product from './Product';


const Content = () => {
  const { agregarAlCarreto } = useContext(ProductContext);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const { selectedCheckboxes } = useContext(FilterContext);
  const [currentPage, setCurrentPage] = useState(1);

  const convertirFormatoCheckboxes = (checkboxes) => {
    const nuevoFormato = {};
    Object.keys(checkboxes).forEach((category) => {
      nuevoFormato[category] = Object.values(checkboxes[category]);
    });
    return nuevoFormato;
  };

  const fetchData = async (selectedFilters, page) => {
    try {
      const response = await fetch(`http://localhost:9080/p3.php?page=${page}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedFilters),
      });

      if (!response.ok) {
        throw new Error("Hubo un problema con la petición Fetch.");
      }

      const data = await response.json();
      setProductos(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const checkboxesParaEnviar = convertirFormatoCheckboxes(selectedCheckboxes);
    fetchData(checkboxesParaEnviar, currentPage);
  }, [selectedCheckboxes, currentPage]);

  const handleClick = (producto) => {
    const productSelected = productos.find((item) => item.pid === producto.target.id)
    agregarAlCarreto(productSelected);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const productsPerPage = 8;
  const totalPages = Math.ceil(productos.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const displayedProducts = productos.slice(startIndex, startIndex + productsPerPage);

  return (
    <>
      {error ? (
        <p>Error al obtener datos: {error}</p>
      ) : (
        <div className={styles.content} onClick={handleClick}>
          {displayedProducts.map((producto) => (
            <Product key={producto.pid} producto={producto} handleClick={handleClick} />
          ))}
          {totalPages > 1 && (
            <div>
              <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                Anterior
              </button>
              <span>Página {currentPage} de {totalPages}</span>
              <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                Siguiente
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};


export default Content;
