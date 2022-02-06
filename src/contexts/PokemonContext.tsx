/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { apiURL } from '../constants';

type PokemonContextType = {
  mainData: PokemonData[];
  searchEngine: (searchQuery?: string, type?: string) => void;
  setTypeSearch: (type: string) => void;
  setQuerySearch: (type: string) => void;
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

  const [mainData, setMainData] = useState<PokemonData[]>([]);
  const [actualSearch, setActualSearch] = useState<PokemonData[]>([]);
  const [typeSearch, setTypeSearch] = useState('');
  const [querySearch, setQuerySearch] = useState('');

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
        setMainData(duplicateFilter);
      } catch (err: unknown) {
        if (err instanceof Error) {
          // eslint-disable-next-line no-alert
          alert(`${err.name}: ${err.message}`);
        }
      }
    })();
  }, []);

  const searchEngine = useCallback(
    (queryString, typeString) => {
      const searchResult = apiPokemonListResult.filter(
        (value) =>
          value.name
            .toLocaleLowerCase()
            .startsWith(queryString?.toLocaleLowerCase()) ||
          Number(value.national_number) === Number(queryString),
      );

      setMainData(searchResult);

      if (typeString !== '') {
        setMainData(
          searchResult.filter((item) => item.type.includes(typeString)),
        );
      }
    },
    [apiPokemonListResult],
  );

  useEffect(() => {
    searchEngine(querySearch, typeSearch);
  }, [querySearch, typeSearch, apiPokemonListResult, searchEngine]);

  return (
    <PokemonContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ mainData, searchEngine, setTypeSearch, setQuerySearch }}
    >
      {children}
    </PokemonContext.Provider>
  );
}
