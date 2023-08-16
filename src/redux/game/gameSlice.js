import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchGames = createAsyncThunk('games/fetchGames', async () => {
  const options = {
    method: 'GET',
    url: 'https://mmo-games.p.rapidapi.com/games',
    headers: {
      'X-RapidAPI-Key': '97ef271dcdmshfa9697705cfd313p12447cjsn6c2ce124cc77',
      'X-RapidAPI-Host': 'mmo-games.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
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
  } catch (error) {
    return error;
  }
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
