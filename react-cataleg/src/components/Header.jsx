import styles from '../components/SCSS/header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1><strong>Soft</strong>GPL</h1>
      <ul>
        <li>Blog</li>
        <li>Fòrum</li>
        <li>Clients</li>
      </ul>
    </header>
  );
};

export default Header;