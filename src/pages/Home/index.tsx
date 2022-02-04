import { Header } from '../../components/Header';
import { PokemonCardList } from '../../components/PokemonCardList';
import { SearchBar } from '../../components/SearchBar';
import { SortOption } from '../../components/SortOption';
import { FilterMenu } from '../../components/FilterMenu';

import styles from './style.module.scss';

export function Home() {
  return (
    <>
      <Header />

      <main className={styles.mainContainer}>
        <header className={styles.mainHeader}>
          <SearchBar />
          <SortOption />
        </header>

        <div className={styles.mainContent}>
          <aside className={styles.filterSection}>
            <FilterMenu />
          </aside>

          <section className={styles.pokemonsSection}>
            <PokemonCardList />
          </section>
        </div>
      </main>
    </>
  );
}
