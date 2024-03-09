// App.jsx
import { ProductProvider } from '../src/components/context/ProductContext';
import { FilterProvider } from '../src/components/context/FilterContext';
import Aside from './components/Aside';
import Content from './components/Content';
import Footer from './components/Footer';
import Header from './components/Header';
import MainMenu from './components/MainMenu';
import styles from './components/SCSS/carrito.module.scss';

const App = () => {
  return (
    <div className={styles.carrito}>
      <ProductProvider>
        <Header />
        <MainMenu />
        <FilterProvider>
          <div>
            <Aside />
            <Content />
          </div>
        </FilterProvider>
        <Footer />
      </ProductProvider>
    </div>
  );
};

export default App;
