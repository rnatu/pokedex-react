import { useState } from 'react';
import { pokemonTypes } from '../../constants';
import { TypeButton } from '../TypeButton';
import styles from './styles.module.scss';

export function FilterMenu() {
  const [typeButtonActive, setTypeButtonActive] = useState('');

  console.log(typeButtonActive);

  return (
    <div className={styles.filterMenuContainer}>
      <span>Filtrar por Tipo</span>
      <div className={styles.buttonsContainer}>
        {pokemonTypes.map((type) => (
          <TypeButton
            type={type}
            typeButtonActive={typeButtonActive}
            setTypeButtonActive={setTypeButtonActive}
          />
        ))}
      </div>
      <span>Filtrar Favoritos</span>

      <input type="checkbox" className={styles.switch_1} />
    </div>
  );
}
