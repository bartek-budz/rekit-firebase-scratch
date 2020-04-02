import {
  AUTH_SET_STATE,
} from '../../../../src/features/auth/redux/constants';

import {
  setState,
  reducer,
} from '../../../../src/features/auth/redux/setState';

describe('auth/redux/setState', () => {
  it('returns correct action by setState', () => {
    expect(setState()).toHaveProperty('type', AUTH_SET_STATE);
  });

  it('handles action type AUTH_SET_STATE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: AUTH_SET_STATE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
