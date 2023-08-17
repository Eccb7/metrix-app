import gameReducer, { setSelectedGame } from '../../redux/game/gameSlice';

describe('gameReducer', () => {
  it('should set selected game correctly', () => {
    const initialState = {
      data: [],
      selectedGame: null,
    };

    const newState = gameReducer(initialState, setSelectedGame({ id: 1, title: 'Test Game' }));
    expect(newState.selectedGame).toEqual({ id: 1, title: 'Test Game' });
  });
});
