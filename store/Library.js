import {createSlice} from '@reduxjs/toolkit';

const Library = createSlice({
  name: 'library',
  initialState: {
    artists: [],
    albums: [],
    playlists: [],
    shows: [],
    episodes: [],
  },

  reducers: {
    setartists: (state, action) => {
      state.artists = action.payload;
    },
    setalbums: (state, action) => {
      state.albums = action.payload;
    },
    setplaylists: (state, action) => {
      state.playlists = action.payload;
    },
    setShows: (state, action) => {
      state.shows = action.payload;
    },
    setEpisodes: (state, action) => {
      state.episodes = action.payload;
    },
  },
});

export const setartists = Library.actions.setartists;
export const setalbums = Library.actions.setalbums;
export const setplaylists = Library.actions.setplaylists;
export const setShows = Library.actions.setShows;
export const setEpisodes = Library.actions.setEpisodes;
export default Library.reducer;
