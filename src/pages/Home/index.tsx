import { Header } from '../../components/Header';
import { PokemonCardList } from '../../components/PokemonCardList';
import { SearchBar } from '../../components/SearchBar';
import { SortMenu } from '../../components/SortMenu';
import { TypeFilter } from '../../components/TypeFilter';

import styles from './style.module.scss';

export function Home() {
  return (
    <>
      <Header />

      <main className={styles.mainContainer}>
        <header className={styles.mainHeader}>
          <SearchBar />
          <SortMenu />
        </header>

        <div className={styles.mainContent}>
          <aside className={styles.filterSection}>
            <TypeFilter />
          </aside>

          <section className={styles.pokemonsSection}>
            <PokemonCardList />
          </section>
        </div>
      </main>
    </>
  );
}
