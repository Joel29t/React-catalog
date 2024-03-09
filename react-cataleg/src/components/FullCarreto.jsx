import React, { useContext, useState, memo, useMemo, useCallback } from 'react';
import { ProductContext } from './context/ProductContext';
import Button from './Button';
import CartItem from './CartItem';

const FullCarreto = memo(function FullCarreto({ toggleFullCarreto }) {
  const { carreto, setCarreto } = useContext(ProductContext);
  const [cantidades, setCantidades] = useState({});

  const handleEmptyCarreto = useCallback(() => {
    toggleFullCarreto();
    setCarreto([]);
    setCantidades({});
  }, [toggleFullCarreto, setCarreto, setCantidades]);

  const handleQuantityChange = useCallback((pid, value) => {
    if (value === '0') {
      const updatedCarreto = carreto.filter((element) => element.pid !== pid);
      setCarreto(updatedCarreto);

      if (carreto.length === 1) {
        handleEmptyCarreto();
      }
    }

    setCantidades((prevCantidades) => ({ ...prevCantidades, [pid]: value }));
  }, [carreto, setCarreto, handleEmptyCarreto]);

  const totalPrice = useMemo(() => {
    return carreto.reduce((acc, producto) => {
      const pid = producto.pid;
      const quantity = cantidades[pid] || '1';
      const price = parseFloat(producto.preu);
      return acc + parseInt(quantity, 10) * price;
    }, 0);
  }, [carreto, cantidades]);

  const memoizedButtons = useMemo(() => {
    return (
      <div>
        <Button onClick={toggleFullCarreto} text="Seguir comprant" />
        <Button onClick={handleEmptyCarreto} text="Buidar carretó" />
        <p>Total: <span>{totalPrice.toFixed(2)}</span></p>
      </div>
    );
  }, [toggleFullCarreto, handleEmptyCarreto, totalPrice]);

  return (
    <div className="fullCarreto oculto">
      <div>
        <table>
          <thead>
            <tr>
              <th>Ref.</th>
              <th>Imatge</th>
              <th>Descripció</th>
              <th>Quantitat</th>
              <th>Preu</th>
              <th>Import</th>
            </tr>
          </thead>
          <tbody>
            {carreto.map((producto) => (
              <CartItem
                key={producto.pid}
                producto={producto}
                cantidad={cantidades[producto.pid] || '1'}
                onChangeCantidad={handleQuantityChange}
              />
            ))}
          </tbody>
        </table>
        {memoizedButtons}
      </div>
    </div>
  );
});

export default FullCarreto;
