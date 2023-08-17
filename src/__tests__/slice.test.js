import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import { fetchGames } from '../redux/game/gameSlice';
import { fetchGameDetails } from '../redux/details/detailsSlice';

// Mock the Axios instance
jest.mock('axios');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('gameSlice', () => {
  it('should fetch games successfully', async () => {
    const mockResponse = [{ id: 1, title: 'Game 1' }, { id: 2, title: 'Game 2' }];
    axios.get.mockResolvedValue({ data: mockResponse });

    const store = mockStore({}); // Provide initial state here if needed

    await store.dispatch(fetchGames());

    const actions = store.getActions();
    expect(actions[0].type).toBe(fetchGames.fulfilled.type);
    expect(actions[0].payload).toEqual(mockResponse);
  });

  it('should handle fetch games failure', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));

    const store = mockStore({});

    await store.dispatch(fetchGames());

    const actions = store.getActions();
    expect(actions[0].type).toBe(fetchGames.rejected.type);
    expect(actions[0].error.message).toBe('Network Error');
  });
});

describe('detailsSlice', () => {
  it('should fetch game details successfully', async () => {
    const mockResponse = { id: 1, title: 'Game 1 Details' };
    axios.request.mockResolvedValue({ data: mockResponse });

    const store = mockStore({});

    await store.dispatch(fetchGameDetails(1));

    const actions = store.getActions();
    expect(actions[0].type).toBe(fetchGameDetails.fulfilled.type);
    expect(actions[0].payload).toEqual(mockResponse);
  });

  it('should handle fetch game details failure', async () => {
    axios.request.mockRejectedValue(new Error('Not Found'));

    const store = mockStore({});

    await store.dispatch(fetchGameDetails(1));

    const actions = store.getActions();
    expect(actions[0].type).toBe(fetchGameDetails.rejected.type);
    expect(actions[0].error.message).toBe('Error fetching game details');
  });
});
