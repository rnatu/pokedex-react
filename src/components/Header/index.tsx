import styles from './styles.module.scss';

import pokeball from '../../assets/images/pokeball-icon.png';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.blackBar} />
      <div className={styles.headerContent}>
        <div>
          <img src={pokeball} alt="Pokebola" />
          <h1>Pokédex</h1>
        </div>
      </div>
    </header>
  );
}
