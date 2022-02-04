import { FiSearch } from 'react-icons/fi';
import styles from './styles.module.scss';

export function SearchBar() {
  return (
    <form action="/" className={styles.searchBar}>
      <input type="text" placeholder="Pesquisar por nome ou número" />
      <button type="submit" aria-label="pesquisar">
        <FiSearch />
      </button>
    </form>
  );
}
