// import { useEffect, useState } from 'react';
import { usePokemon } from '../../hooks/usePokemon';
import styles from './styles.module.scss';

export function SearchBar() {
  const { searchEngine } = usePokemon();

  return (
    <form action="/" className={styles.searchBar}>
      <input
        type="text"
        id="pokemonSearch"
        placeholder="Pesquisar por nome ou número"
        onChange={(e) => searchEngine(e.target.value)}
      />

      <i className="fas fa-search fa-xs" />
    </form>
  );
}
