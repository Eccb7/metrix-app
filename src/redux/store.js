import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './game/gameSlice';
import detailsReducer from './details/detailsSlice';

const store = configureStore({
  reducer: {
    games: gameReducer,
    details: detailsReducer,
  },
});

export default store;
