import { Header } from '../../components/Header';
import { SearchBar } from '../../components/SearchBar';
import { SortMenu } from '../../components/SortMenu';

import styles from './style.module.scss';

export function Home() {
  return (
    <>
      <Header />

      <main className={styles.mainContainer}>
        <div className={styles.mainContent}>
          <SearchBar />
          <SortMenu />
        </div>
      </main>
    </>
  );
}
