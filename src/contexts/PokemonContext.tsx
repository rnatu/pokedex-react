import axios from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { apiURL } from '../constants';

type PokemonContextType = {
  queryResult: PokemonData[];
  searchEngine: (searchQuery: string) => PokemonData[] | void;
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
  type: string[];
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
  const [apiPokemonListResult, setApiPokemonListResult] = useState<
    PokemonData[]
  >([]);

  const [queryResult, setQueryResult] = useState<PokemonData[]>([]);

  useEffect(() => {
    (async function getPokemonData() {
      try {
        const { data }: ApiResponseType = await axios.get(apiURL);

        const duplicateFilter = data.results.filter(
          (pokemon, index, array) =>
            index ===
            array.findIndex(
              (element) => element.national_number === pokemon.national_number,
            ),
        );

        setApiPokemonListResult(duplicateFilter);

        setQueryResult(duplicateFilter);
      } catch (err: unknown) {
        if (err instanceof Error) {
          // eslint-disable-next-line no-alert
          alert(`${err.name}: ${err.message}`);
        }
      }
    })();
  }, []);

  const searchEngine = (searchQuery: string) => {
    if (searchQuery === '') {
      return setQueryResult(apiPokemonListResult);
    }

    const results = apiPokemonListResult.filter(
      (value) =>
        value.name
          .toLocaleLowerCase()
          .startsWith(searchQuery?.toLocaleLowerCase()) ||
        Number(value.national_number) === Number(searchQuery),
    );
    return setQueryResult(results);
  };

  return (
    <PokemonContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ queryResult, searchEngine }}
    >
      {children}
    </PokemonContext.Provider>
  );
}
