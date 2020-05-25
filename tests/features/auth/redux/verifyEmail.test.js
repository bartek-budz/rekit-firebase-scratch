import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  AUTH_VERIFY_EMAIL_BEGIN,
  AUTH_VERIFY_EMAIL_SUCCESS,
  AUTH_VERIFY_EMAIL_FAILURE,
  AUTH_VERIFY_EMAIL_DISMISS_ERROR,
} from '../../../../src/features/auth/redux/constants';

import {
  verifyEmail,
  dismissVerifyEmailError,
  reducer,
} from '../../../../src/features/auth/redux/verifyEmail';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth/redux/verifyEmail', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when verifyEmail succeeds', () => {
    const store = mockStore({});

    return store.dispatch(verifyEmail())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', AUTH_VERIFY_EMAIL_BEGIN);
        expect(actions[1]).toHaveProperty('type', AUTH_VERIFY_EMAIL_SUCCESS);
      });
  });

  it('dispatches failure action when verifyEmail fails', () => {
    const store = mockStore({});

    return store.dispatch(verifyEmail({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', AUTH_VERIFY_EMAIL_BEGIN);
        expect(actions[1]).toHaveProperty('type', AUTH_VERIFY_EMAIL_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissVerifyEmailError', () => {
    const expectedAction = {
      type: AUTH_VERIFY_EMAIL_DISMISS_ERROR,
    };
    expect(dismissVerifyEmailError()).toEqual(expectedAction);
  });

  it('handles action type AUTH_VERIFY_EMAIL_BEGIN correctly', () => {
    const prevState = { verifyEmailPending: false };
    const state = reducer(
      prevState,
      { type: AUTH_VERIFY_EMAIL_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.verifyEmailPending).toBe(true);
  });

  it('handles action type AUTH_VERIFY_EMAIL_SUCCESS correctly', () => {
    const prevState = { verifyEmailPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_VERIFY_EMAIL_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.verifyEmailPending).toBe(false);
  });

  it('handles action type AUTH_VERIFY_EMAIL_FAILURE correctly', () => {
    const prevState = { verifyEmailPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_VERIFY_EMAIL_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.verifyEmailPending).toBe(false);
    expect(state.verifyEmailError).toEqual(expect.anything());
  });

  it('handles action type AUTH_VERIFY_EMAIL_DISMISS_ERROR correctly', () => {
    const prevState = { verifyEmailError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: AUTH_VERIFY_EMAIL_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.verifyEmailError).toBe(null);
  });
});

