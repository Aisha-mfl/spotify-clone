import {configureStore} from '@reduxjs/toolkit';
import AuthReducer from './auth';
import LibraryReducer from './Library';
import PlayerReducer from './Player';
import favoriteReducer from './favorite'
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    library:LibraryReducer,
    player:PlayerReducer,
    favorites:favoriteReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
