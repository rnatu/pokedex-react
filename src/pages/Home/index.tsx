import { Header } from '../../components/Header';
import { CardGrid } from '../../components/CardGrid';
import { SearchBar } from '../../components/SearchBar';
import { SortOption } from '../../components/SortOption';
import { FilterMenu } from '../../components/FilterMenu';

import styles from './styles.module.scss';
import { Footer } from '../../components/Footer';

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
            <CardGrid />
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
