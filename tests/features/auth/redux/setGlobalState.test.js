import {
  AUTH_SET_GLOBAL_STATE,
} from '../../../../src/features/auth/redux/constants';

import {
  setGlobalState,
  reducer,
} from '../../../../src/features/auth/redux/setGlobalState';

describe('auth/redux/setGlobalState', () => {
  it('returns correct action by setGlobalState', () => {
    expect(setGlobalState()).toHaveProperty('type', AUTH_SET_GLOBAL_STATE);
  });

  it('handles action type AUTH_SET_GLOBAL_STATE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: AUTH_SET_GLOBAL_STATE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
