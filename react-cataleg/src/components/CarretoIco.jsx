import { memo } from 'react';

const CarretoIco = memo(function CarretoIco({ contadorProductos, onClick }) {
  return (
    <div onClick={onClick}>
      <img src="src/components/assets/carreto.svg" alt="Carreto" />
      <p>{contadorProductos}</p>
    </div>
  );
});

export default CarretoIco;
