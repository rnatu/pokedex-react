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
  typeFilter: (type: string) => void;
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
        setActualSearch(duplicateFilter);
      } catch (err: unknown) {
        if (err instanceof Error) {
          // eslint-disable-next-line no-alert
          alert(`${err.name}: ${err.message}`);
        }
      }
    })();
  }, []);

  const searchEngine = (searchQueryString: string = '') => {
    const searchResult = apiPokemonListResult.filter(
      (value) =>
        value.name
          .toLocaleLowerCase()
          .startsWith(searchQueryString?.toLocaleLowerCase()) ||
        Number(value.national_number) === Number(searchQueryString),
    );

    setActualSearch(searchResult);
    setMainData(searchResult);
  };

  const typeFilter = (type: string) => {
    if (type === '') {
      setMainData(actualSearch);
      return;
    }

    setMainData(actualSearch.filter((item) => item.type.includes(type)));
  };

  return (
    <PokemonContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ mainData, searchEngine, typeFilter }}
    >
      {children}
    </PokemonContext.Provider>
  );
}
