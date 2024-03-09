import { useContext, useState } from 'react';
import { ProductContext } from '../components/context/ProductContext';
import styles from '../components/SCSS/mainMenu.module.scss';
import FullCarreto from './FullCarreto';
import CarretoIco from './CarretoIco';

const MainMenu = () => {
  const { contadorProductos } = useContext(ProductContext);
  const [isFullCarretoVisible, setIsFullCarretoVisible] = useState(false);

  function toggleFullCarreto() {
    setIsFullCarretoVisible(!isFullCarretoVisible);
  }

  return (
    <>
      <div className={styles.mainMenu}>
        <ul>
          <li>HOME</li>
          <li>SOBRE NOSALTRES</li>
          <li>PRODUCTES</li>
          <li>PRÀCTICA 4</li>
          <li>CONTACTE</li>
        </ul>
        <div>
          {contadorProductos > 0 && (
            <CarretoIco contadorProductos={contadorProductos} onClick={toggleFullCarreto} />
          )}
        </div>
      </div>
      {isFullCarretoVisible ? (
        <FullCarreto toggleFullCarreto={toggleFullCarreto} />
      ) : null}

    </>
  );
};

export default MainMenu;
