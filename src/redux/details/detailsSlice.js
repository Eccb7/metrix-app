import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchGameDetails = createAsyncThunk(
  'details/fetchGameDetails',
  async (gameId) => {
    const options = {
      method: 'GET',
      url: 'https://mmo-games.p.rapidapi.com/game',
      params: { id: gameId },
      headers: {
        'X-RapidAPI-Key': '97ef271dcdmshfa9697705cfd313p12447cjsn6c2ce124cc77',
        'X-RapidAPI-Host': 'mmo-games.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching game details');
    }
  },
);

const detailsSlice = createSlice({
  name: 'details',
  initialState: {
    selectedGame: null,
    loading: 'idle',
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGameDetails.pending, (state) => {
        state.loading = 'loading';
        state.error = '';
      })
      .addCase(fetchGameDetails.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.selectedGame = action.payload;
      })
      .addCase(fetchGameDetails.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      });
  },
});

export const selectSelectedGame = (state) => state.details.selectedGame;

export default detailsSlice.reducer;
