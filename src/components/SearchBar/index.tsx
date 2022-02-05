import { useEffect, useState } from 'react';
import { usePokemon } from '../../hooks/usePokemon';
import styles from './styles.module.scss';

export function SearchBar() {
  const { searchEngine } = usePokemon();
  const [search, setSearch] = useState('');

  useEffect(() => {
    searchEngine(search);
  }, [search, searchEngine]);

  return (
    <form action="/" className={styles.searchBar}>
      <input
        type="text"
        id="pokemonSearch"
        placeholder="Pesquisar por nome ou número"
        onChange={(e) => setSearch(e.target.value)}
      />

      <i className="fas fa-search fa-xs" />
    </form>
  );
}
