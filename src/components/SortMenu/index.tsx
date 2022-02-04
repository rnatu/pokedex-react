import styles from './styles.module.scss';

export function SortMenu() {
  return (
    <div className={styles.sortMenuContainer}>
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
