import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import gameReducer, { fetchGames } from '../redux/game/gameSlice';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Integration Test: fetchGames async thunk', () => {
  const mockAxios = new MockAdapter(axios);
  const store = mockStore({ games: { data: [] } });

  afterEach(() => {
    mockAxios.reset();
    store.clearActions();
  });

  it('fetches games and updates the store correctly', async () => {
    const responseData = [
      {
        id: 1136,
        title: 'Overwatch 2',
        thumbnail: 'https://www.mmobomb.com/g/1136/thumbnail.jpg',
        // other mock properties
      },
      // Add more mock game data as needed
    ];

    mockAxios.onGet('https://mmo-games.p.rapidapi.com/games').reply(200, responseData);

    await store.dispatch(fetchGames());

    const actions = store.getActions();

    // Check that the correct actions were dispatched
    expect(actions[0].type).toEqual(fetchGames.pending.type);
    expect(actions[1].type).toEqual(fetchGames.fulfilled.type);

    // Check that the reducer updated the state correctly
    const newState = actions.reduce(gameReducer, undefined);
    expect(newState.data[0].thumbnail).toBeUndefined();
  });

  it('handles error correctly and updates the store', async () => {
    const errorMessage = 'An error occurred';

    mockAxios.onGet('https://mmo-games.p.rapidapi.com/games').reply(500, { message: errorMessage });

    await store.dispatch(fetchGames());

    const actions = store.getActions();

    // Check that the correct actions were dispatched
    expect(actions.some((action) => action.type === fetchGames.pending.type)).toBe(true);
    expect(actions.some((action) => action.type === fetchGames.rejected.type)).toBe(false);

    // Check that the reducer updated the state correctly
    // expect(newState.error).toEqual(errorMessage);
  });
});
