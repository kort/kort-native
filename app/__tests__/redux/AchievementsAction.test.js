import * as actions from '../../src/actions/AchievementsActions';
import * as types from '../../src/actions/types';

describe('actions', () => {
  it('should create an action to clear error msg', () => {
    const payload = null;
    const expectedAction = {
      type: types.ACHIEVEMENTS_CLEAR_ERROR_MSG,
      payload
    };
    expect(actions.clearErrorMsg()).toEqual(expectedAction);
  });
});
