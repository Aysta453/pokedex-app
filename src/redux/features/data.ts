import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import axios from 'axios';

const API = `https://pokeapi.co/api/v2/`;
const LIMIT = 20;

export const getPokemonsNamesThunk = createAsyncThunk('pokemons/getPokemonsNames',
  async () => {
    axios.get(`${API}pokemon?limit=${LIMIT}&offset=0`).then(r => {
      return r.data.results;
    })
  }
);

interface Type {
  type: { name: string };
};

interface Pokemon {
  name: string;
  url: string;
  types: Array<Type>;
  sprites: {
    front_default: string;
  };
  weight: number;
  height: number;
};

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    names: [] as Pokemon[],
    pokemonsInfoSource: [] as Pokemon[],
    pokemonsInfo: [] as Pokemon[],
    searchName: "" as string,
    searchType: "" as string,
    theme: true as boolean,
  },
  reducers: {
    loadNames: (state, action: PayloadAction<Pokemon[]>) => {
      state.names = [...state.names, ...action.payload];
    },
    loadInfo: (state, action: PayloadAction<Pokemon>) => {
      state.pokemonsInfoSource = [...state.pokemonsInfoSource, action.payload];
    },
    updateSearch: (state, action: PayloadAction<Pokemon[]>) => {
      state.pokemonsInfo = action.payload;
    },
    changeSearchName: (state, action: PayloadAction<string>) => {
      state.searchName = action.payload;
    },
    changeSearchType: (state, action: PayloadAction<string>) => {
      state.searchType = action.payload;
    },
    changeTheme: (state) => {
      state.theme = !state.theme;
    },
  }
})

export const fetchNames = () => (dispatch: Dispatch<any>, state: RootStateOrAny) => {

  axios.get(`${API}pokemon?limit=${LIMIT}&offset=${state().names.length}`).then(r => {

    const results = r.data.results.filter((pokemon: Pokemon) => {
      return state().names.find((pokemonByName: Pokemon) => {   
        return pokemonByName.name === pokemon.name
      }) === undefined;
    })

    dispatch(loadNames(results));
    dispatch(fetchInfo());
  })
}

export const fetchInfo = () => (dispatch: Dispatch<any>, state: RootStateOrAny) => {

  state().names.map((pokemonAPI: Pokemon) => {
    axios.get(`${pokemonAPI.url}`).then(r => {

      if (!state().pokemonsInfoSource.find((pokemon: Pokemon) => pokemonAPI.name === pokemon.name)) {
        dispatch(loadInfo(r.data));
        dispatch(handleSearching());
      }
    })
  })
}

export const handleSearching = () => (dispatch: Dispatch<any>, state: RootStateOrAny) => {

  const filteringPokemons = state().pokemonsInfoSource.filter((pokemonInfoSource: Pokemon) => {
    const includesName = pokemonInfoSource.name.includes(state().searchName)
    const includesType = pokemonInfoSource.types.find((type: RootStateOrAny) => {
      return type.type.name.includes(state().searchType)
    }) !== undefined;
    return includesName && includesType && true;
  })
  dispatch(updateSearch(filteringPokemons));
}

export const { loadNames, loadInfo, changeSearchName, changeSearchType, updateSearch, changeTheme } = dataSlice.actions

export default dataSlice.reducer