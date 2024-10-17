import { Action, createReducer, on } from '@ngrx/store';
import { loadUser, loadUserError, loadUserSuccess } from '../actions';
import { User } from '../../models/user.model';

export interface UserState {
  id: string;
  user: User | null;
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const userInitialState: UserState = {
  id: '',
  user: null,
  loaded: false,
  loading: false,
  error: null,
};

const _userReducer = createReducer(
  userInitialState,

  on(loadUser, (state, { id }) => ({ ...state, loading: true, id: id })),

  on(loadUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    loaded: true,
    user: { ...user },
  })),

  on(loadUserError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    user: null,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message,
    },
  }))
);

export function userReducer(
  state: UserState = userInitialState,
  action: Action
) {
  return _userReducer(state, action);
}
