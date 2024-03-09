import React, { memo } from 'react';

const CartItem = memo(function CartItem({ producto, cantidad, onChangeCantidad }) {
  return (
    <tr key={producto.pid}>
      <td>{producto.pid}</td>
      <td>
        <img src={`imgs/${producto.imatge}`} alt={producto.model} />
      </td>
      <td>
        {producto.marca} {producto.model}/{producto.processador}/{producto.ram}/{producto.emmagatzematge}/{producto.polzades}
      </td>
      <td>
        <input
          type="number"
          min="0"
          value={cantidad || 1}
          onChange={(e) => onChangeCantidad(producto.pid, e.target.value)}
        />
      </td>
      <td>{producto.preu}</td>
      <td>{(cantidad || 1) * producto.preu}</td>
    </tr>
  );
});

export default CartItem;
