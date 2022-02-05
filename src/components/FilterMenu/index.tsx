import { useState } from 'react';
import { pokemonTypes } from '../../constants';
import { TypeButton } from '../TypeButton';
import styles from './styles.module.scss';

export function FilterMenu() {
  const [typeButtonActive, setTypeButtonActive] = useState('');

  return (
    <div className={styles.filterMenuContainer}>
      <span>Filtrar por Tipo</span>
      <div className={styles.buttonsContainer}>
        {pokemonTypes.map((type) => (
          <TypeButton
            key={type}
            type={type}
            typeButtonActive={typeButtonActive}
            setTypeButtonActive={setTypeButtonActive}
          />
        ))}
      </div>

      <label htmlFor="toggle-favorites">
        <p>Filtrar Favoritos</p>
        <input
          id="toggle-favorites"
          type="checkbox"
          className={styles.switch}
        />
      </label>
    </div>
  );
}
