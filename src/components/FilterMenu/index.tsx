import { types } from '../../constants';
import { TypeButton } from '../TypeButton';
import styles from './styles.module.scss';

export function FilterMenu() {
  return (
    <div className={styles.filterMenuContainer}>
      <span>Filtrar por Tipo</span>
      <div className={styles.buttonsContainer}>
        {types.map((type) => (
          <TypeButton type={type} />
        ))}
      </div>
      <span>Filtrar Favoritos</span>

      <input type="checkbox" className={styles.switch_1} />
    </div>
  );
}
