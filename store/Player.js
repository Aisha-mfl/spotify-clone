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

    playNext: state => {
      if (state.currentIndex < state.currentPlaylist.length - 1) {
        state.currentIndex += 1;
        state.currTrack = {
          ...state.currentPlaylist[state.currentIndex],
          artwork:
            state.currentPlaylist[state.currentIndex]?.album?.images?.[0]?.url,
        };
      } else {
        state.isplaying = false;
      }
    },
    playPrevious: state => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
        state.currTrack = state.currentPlaylist[state.currentIndex];
      }
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
