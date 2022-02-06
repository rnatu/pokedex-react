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
  setQuerySearch: (query: string) => void;
  setOrderSelection: (order: string) => void;
  setTypeSearch: (type: string) => void;
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
  const [typeSearch, setTypeSearch] = useState('');
  const [querySearch, setQuerySearch] = useState('');
  const [orderSelection, setOrderSelection] = useState('ascending');

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
    (query, order, type) => {
      const searchResult = apiPokemonListResult.filter(
        (value) =>
          value.name
            .toLocaleLowerCase()
            .startsWith(query?.toLocaleLowerCase()) ||
          Number(value.national_number) === Number(query),
      );
      setMainData(searchResult);

      if (order === 'ascending') {
        searchResult.sort((a, b) => {
          if (a.national_number > b.national_number) return 1;
          if (a.national_number < b.national_number) return -1;
          return 0;
        });
      }

      if (order === 'descending') {
        searchResult.sort((a, b) => {
          if (a.national_number > b.national_number) return -1;
          if (a.national_number < b.national_number) return 1;
          return 0;
        });
      }

      if (type !== '') {
        setMainData(searchResult.filter((item) => item.type.includes(type)));
      }
    },
    [apiPokemonListResult],
  );

  useEffect(() => {
    searchEngine(querySearch, orderSelection, typeSearch);
  }, [
    querySearch,
    typeSearch,
    apiPokemonListResult,
    searchEngine,
    orderSelection,
  ]);

  return (
    <PokemonContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ mainData, setTypeSearch, setQuerySearch, setOrderSelection }}
    >
      {children}
    </PokemonContext.Provider>
  );
}
