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
  mainData: PokemonMainData[];
  setQuerySearch: (query: string) => void;
  setOrderSelection: (order: string) => void;
  setTypeSearch: (type: string | null) => void;
  favoriteEngine: (pokemonNumber: string, isFavorite: boolean) => void;
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
  isFavorite: boolean;
};

type PokemonMainData = {
  sprites: {
    large: string;
  };
  name: string;
  national_number: string;
  type: string[];
  evolution: {
    name: string;
  };
  isFavorite: boolean;
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
  const [mainData, setMainData] = useState<PokemonMainData[]>([]);
  const [typeSearch, setTypeSearch] = useState<string | null>(null);
  const [querySearch, setQuerySearch] = useState('');
  const [orderSelection, setOrderSelection] = useState('ascending');
  const [favoriteList, setFavoriteList] = useState<string[]>(
    JSON.parse(localStorage.getItem('favoritePokemonList') || '[]'),
  );

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

        const favoritesVerify = duplicateFilter.map((pokemon) => ({
          ...pokemon,
          isFavorite: favoriteList.includes(pokemon.national_number),
        }));

        setApiPokemonListResult(favoritesVerify);
        setMainData(favoritesVerify);
      } catch (err: unknown) {
        if (err instanceof Error) {
          // eslint-disable-next-line no-alert
          alert(`${err.name}: ${err.message}`);
        }
      }
    })();
  }, [favoriteList]);

  const searchEngine = useCallback(
    (query: string, order: string, type: string | null) => {
      const searchResult = apiPokemonListResult.filter(
        (value) =>
          value.name
            .toLocaleLowerCase()
            .startsWith(query?.toLocaleLowerCase()) ||
          Number(value.national_number) === Number(query),
      );

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

      setMainData(searchResult);

      if (type) {
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

  const favoriteEngine = (pokemonNumber: string, isFavorite: boolean) => {
    if (!isFavorite) {
      setFavoriteList((oldState) => [...oldState, pokemonNumber]);
      const setFavorite = mainData.map((pokemon) =>
        pokemon.national_number === pokemonNumber
          ? { ...pokemon, isFavorite: true }
          : pokemon,
      );

      setMainData(setFavorite);
    } else {
      setFavoriteList((oldState) =>
        oldState.filter((item) => item !== pokemonNumber),
      );
      const setFavorite = mainData.map((pokemon) =>
        pokemon.national_number === pokemonNumber
          ? { ...pokemon, isFavorite: false }
          : pokemon,
      );

      setMainData(setFavorite);
    }
  };

  useEffect(
    () =>
      localStorage.setItem('favoritePokemonList', JSON.stringify(favoriteList)),
    [favoriteList],
  );

  return (
    <PokemonContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        mainData,
        setTypeSearch,
        setQuerySearch,
        setOrderSelection,
        favoriteEngine,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}
