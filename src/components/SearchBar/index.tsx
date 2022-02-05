import styles from './styles.module.scss';

export function SearchBar() {
  return (
    <form action="/" className={styles.searchBar}>
      <input
        type="text"
        id="pokemonSearch"
        placeholder="Pesquisar por nome ou número"
      />

      <i className="fas fa-search fa-xs" />
    </form>
  );
}
