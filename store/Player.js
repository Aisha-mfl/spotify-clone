import {createSlice, current} from '@reduxjs/toolkit';

const PlayerSlice = createSlice({
  name: 'player',
  initialState: {
    currTrack: null,
    currentPlaylist: [],
    currentIndex: 0,
    isplaying: false,
    currentAlbum: null,
  },

  reducers: {
    setcurrTrack: (state, action) => {
      state.currTrack = action.payload;
    },
    togglePlay: state => {
      state.isplaying = !state.isplaying;
    },
    setCurrentPlaylist: (state, action) => {
      state.currentPlaylist = action.payload.tracks;
      state.currentIndex = action.payload.index;
      state.queueType = action.payload.queueType;
    },
    setcurrentAlbum: (state, action) => {
      state.currentAlbum = action.payload;
    },
  },
});

export const setcurrTrack = PlayerSlice.actions.setcurrTrack;
export const setCurrentPlaylist = PlayerSlice.actions.setCurrentPlaylist;
export const setcurrentAlbum = PlayerSlice.actions.setcurrentAlbum;
export const togglePlay = PlayerSlice.actions.togglePlay;
export const playNext = PlayerSlice.actions.playNext;
export const playPrevious = PlayerSlice.actions.playPrevious;

export default PlayerSlice.reducer;
