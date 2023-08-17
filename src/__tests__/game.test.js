import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchGames } from '../redux/game/gameSlice';

jest.mock('axios');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetchGames async thunk', () => {
  it('fetches games successfully and checks the thumbnail URL', async () => {
    const responseData = [
      {
        id: 1136,
        title: 'Overwatch 2',
        thumbnail: undefined, // Mock undefined thumbnail URL
        // other mock properties
      },
      // Add more mock game data as needed
    ];

    axios.request.mockResolvedValueOnce({ data: responseData });

    const store = mockStore({}); // You can provide initial state if needed

    await store.dispatch(fetchGames());

    const actions = store.getActions();
    const fulfilledAction = actions.find((action) => action.type === fetchGames.fulfilled.type);

    expect(fulfilledAction.payload[0].thumbnail).toBeUndefined();
  });
});
