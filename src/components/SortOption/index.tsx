import styles from './styles.module.scss';

export function SortOption() {
  return (
    <div className={styles.sortOptionContainer}>
      <span>Ordenar por</span>
      <label htmlFor="sortSearch">
        <select name="sortSearch">
          <option value="teste1">Menor número primeiro</option>
          <option value="teste2">Maior número primeiro </option>
        </select>
      </label>
    </div>
  );
}
