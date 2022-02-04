import { types } from '../../constants';
import { TypeButton } from '../TypeButton';
import styles from './styles.module.scss';

export function TypeFilter() {
  return (
    <div className={styles.typeFilterContainer}>
      <span>Filtrar por Tipo</span>
      <div>
        {types.map((type) => (
          <TypeButton type={type} />
        ))}
      </div>
    </div>
  );
}
