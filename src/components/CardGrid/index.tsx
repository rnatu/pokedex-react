import { usePokemon } from '../../hooks/usePokemon';
import { Card } from '../Card/index';
import styles from './styles.module.scss';

export function CardGrid() {
  const { pokemonList } = usePokemon();

  return (
    <div className={styles.cardGrid}>
      {pokemonList.map((pokemon) => (
        <Card
          key={`${pokemon.national_number}`}
          image={pokemon.sprites.large}
          name={pokemon.name}
          number={pokemon.national_number}
          types={pokemon.type}
        />
      ))}
    </div>
  );
}
