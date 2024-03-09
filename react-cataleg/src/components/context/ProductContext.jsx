// ProductContext.jsx
import { createContext, useState } from 'react';

const ProductContext = createContext(null);

const ProductProvider = ({ children }) => {
    const [carreto, setCarreto] = useState([]);

    const agregarAlCarreto = (producto) => {
        const isProductAlreadyInCarreto = carreto.some((item) => item.pid === producto.pid);
        if (!isProductAlreadyInCarreto) {
            setCarreto((prevCarreto) => [...prevCarreto, producto]);
        }
    };

    const contadorProductos = carreto.length;

    return (
        <ProductContext.Provider value={{ carreto, setCarreto, agregarAlCarreto, contadorProductos }}>
            {children}
        </ProductContext.Provider>
    );
};

export { ProductProvider, ProductContext };
