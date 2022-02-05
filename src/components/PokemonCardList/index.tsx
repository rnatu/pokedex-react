import { usePokemon } from '../../hooks/usePokemon';
import { PokemonCard } from '../PokemonCard/index';

export function PokemonCardList() {
  const { pokemonList } = usePokemon();

  return (
    <>
      {pokemonList.map((pokemon) => (
        <PokemonCard
          key={`${pokemon.national_number}`}
          image={pokemon.sprites.large}
          name={pokemon.name}
          number={pokemon.national_number}
          types={pokemon.types}
        />
      ))}
    </>
  );
}
