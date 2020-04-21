import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  AUTH_VERIFY_RESET_BEGIN,
  AUTH_VERIFY_RESET_SUCCESS,
  AUTH_VERIFY_RESET_FAILURE,
  AUTH_VERIFY_RESET_DISMISS_ERROR,
} from '../../../../src/features/auth/redux/constants';

import {
  verifyReset,
  dismissVerifyResetError,
  reducer,
} from '../../../../src/features/auth/redux/verifyReset';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth/redux/verifyReset', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when verifyReset succeeds', () => {
    const store = mockStore({});

    return store.dispatch(verifyReset())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', AUTH_VERIFY_RESET_BEGIN);
        expect(actions[1]).toHaveProperty('type', AUTH_VERIFY_RESET_SUCCESS);
      });
  });

  it('dispatches failure action when verifyReset fails', () => {
    const store = mockStore({});

    return store.dispatch(verifyReset({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', AUTH_VERIFY_RESET_BEGIN);
        expect(actions[1]).toHaveProperty('type', AUTH_VERIFY_RESET_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissVerifyResetError', () => {
    const expectedAction = {
      type: AUTH_VERIFY_RESET_DISMISS_ERROR,
    };
    expect(dismissVerifyResetError()).toEqual(expectedAction);
  });

  it('handles action type AUTH_VERIFY_RESET_BEGIN correctly', () => {
    const prevState = { verifyResetPending: false };
    const state = reducer(
      prevState,
      { type: AUTH_VERIFY_RESET_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.verifyResetPending).toBe(true);
  });

  it('handles action type AUTH_VERIFY_RESET_SUCCESS correctly', () => {
    const prevState = { verifyResetPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_VERIFY_RESET_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.verifyResetPending).toBe(false);
  });

  it('handles action type AUTH_VERIFY_RESET_FAILURE correctly', () => {
    const prevState = { verifyResetPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_VERIFY_RESET_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.verifyResetPending).toBe(false);
    expect(state.verifyResetError).toEqual(expect.anything());
  });

  it('handles action type AUTH_VERIFY_RESET_DISMISS_ERROR correctly', () => {
    const prevState = { verifyResetError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: AUTH_VERIFY_RESET_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.verifyResetError).toBe(null);
  });
});

