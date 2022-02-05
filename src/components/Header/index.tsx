import styles from './styles.module.scss';

import pokeball from '../../assets/images/pokeball.svg';
import synviaLogo from '../../assets/images/synvia-A.svg';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.blackBar} />
      <div className={styles.headerContent}>
        <div>
          <img src={pokeball} alt="Pokebola" />
          <h1>Pokédex</h1>
        </div>
        <div>
          <img src={synviaLogo} alt="Synvia Logo" />
          <button type="button">
            <i className="fas fa-sign-out-alt fa-lg" />
          </button>
        </div>
      </div>
    </header>
  );
}
