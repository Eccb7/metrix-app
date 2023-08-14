import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchGames = createAsyncThunk('games/fetchGames', async () => {
  const response = await axios.get('/api1/games');
  return response.data.map((obj) => ({
    id: obj.id,
    title: obj.title,
    genre: obj.genre,
    description: obj.description,
    image: obj.thumbnail,
    views: obj.views,
    game_url: obj.game_url,
    releaseDate: obj.release_date,
  }));
});

const gameSlice = createSlice({
  name: 'games',
  initialState: {
    data: [],
    loading: 'idle',
    error: '',
    selectedGame: null,
  },
  reducers: {
    setSelectedGame: (state, action) => {
      const updatedData = state.data.map((game) => {
        if (game.id === action.payload.id) {
          return { ...game, ...action.payload };
        }
        return game;
      });

      return { ...state, selectedGame: action.payload, data: updatedData };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.loading = 'loading';
        state.error = '';
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.data = action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      });
  },
});

export const { setSelectedGame } = gameSlice.actions;

export default gameSlice.reducer;
