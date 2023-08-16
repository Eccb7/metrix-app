import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchGameDetails = createAsyncThunk(
  'details/fetchGameDetails',
  async (gameId) => {
    try {
      const response = await axios.get(`/api1/game?id=${gameId}`);
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
