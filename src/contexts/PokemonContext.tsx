import axios from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { apiURL } from '../constants';

type PokemonContextType = {
  pokemonList: PokemonData[];
  setPokemonList: (pokemon: PokemonData[]) => void;
};

type PokemonContextProviderType = {
  children: ReactNode;
};

type PokemonData = {
  sprites: {
    large: string;
  };
  name: string;
  national_number: string;
  types: string[];
  evolution: {
    name: string;
  };
};

type ApiResponseType = {
  data: {
    results: PokemonData[];
  };
};

export const PokemonContext = createContext({} as PokemonContextType);

export function PokemonContextProvider({
  children,
}: PokemonContextProviderType) {
  const [pokemonList, setPokemonList] = useState<PokemonData[]>([]);

  useEffect(() => {
    (async function getPokemonData() {
      try {
        const { data }: ApiResponseType = await axios.get(apiURL);

        const duplicateFilter = () =>
          data.results.filter(
            (pokemon, index, array) =>
              index ===
              array.findIndex(
                (element) =>
                  element.national_number === pokemon.national_number,
              ),
          );

        setPokemonList(duplicateFilter);
      } catch (err: unknown) {
        if (err instanceof Error) {
          // eslint-disable-next-line no-alert
          alert(`${err.name}: ${err.message}`);
        }
      }
    })();
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <PokemonContext.Provider value={{ pokemonList, setPokemonList }}>
      {children}
    </PokemonContext.Provider>
  );
}
