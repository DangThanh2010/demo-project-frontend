import { createRequestTypes } from './utils';

export const LOGIN = createRequestTypes('LOGIN');
export const login = (params) => ({ type: LOGIN.REQUEST, params });

export const LOGOUT = 'LOGOUT';
export const logout = (params) => ({ type: LOGOUT, params });

export const UPDATE_TOKENS = 'UPDATE_TOKENS';
export const updateTokens = (params) => ({ type: UPDATE_TOKENS, params });
