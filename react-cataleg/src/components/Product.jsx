import { memo } from 'react';

const Product = memo(function Product({producto}) {
  return (
    <div key={producto.pid} className="item">
      <div>
        <h1>{producto.marca}</h1>
        <h2>{producto.model}</h2>
      </div>
      <img src={`imgs/${producto.imatge}`} alt={producto.model} />
      <p>{producto.processador}/{producto.ram}/{producto.emmagatzematge}/{producto.polzades}</p>
      <a href="">Veure detalls</a>
      <p id="prize">Preu: {producto.preu}€</p>
      <button id={producto.pid}>
        Comprar
      </button>
    </div>
  );
});

export default Product;
