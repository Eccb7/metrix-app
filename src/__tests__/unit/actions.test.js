import { fetchGames } from '../../redux/game/gameSlice';

describe('fetchGames action', () => {
  it('should create the correct action', () => {
    const action = fetchGames.pending();
    expect(action.type).toBe('games/fetchGames/pending');
  });
});
