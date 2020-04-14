import {
  COMMON_CHANGE_LANGUAGE,
} from '../../../../src/features/common/redux/constants';

import {
  changeLanguage,
  reducer,
} from '../../../../src/features/common/redux/changeLanguage';

describe('common/redux/changeLanguage', () => {
  it('returns correct action by changeLanguage', () => {
    expect(changeLanguage()).toHaveProperty('type', COMMON_CHANGE_LANGUAGE);
  });

  it('handles action type COMMON_CHANGE_LANGUAGE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_CHANGE_LANGUAGE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
