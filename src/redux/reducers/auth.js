import { LOGIN, LOGOUT, UPDATE_TOKENS } from '../actions/auth';
import {
  setAxiosDefaultAuthToken,
  removeAxiosDefaultAuthToken,
} from '../../utils/utils';

const initialState = {
  isLoggingIn: false,
  isLoggedIn: false,
  account: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      removeAxiosDefaultAuthToken();
      return { ...initialState };

    case LOGIN.REQUEST:
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: true,
      };
    case LOGIN.SUCCESS:
      setAxiosDefaultAuthToken(action.data.tokens.access.token);
      return {
        ...state,
        isLoggedIn: true,
        isLoggingIn: false,
        account: action.data,
      };
    case LOGIN.FAIL:
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: false,
        account: {},
      };

    case UPDATE_TOKENS:
      setAxiosDefaultAuthToken(action.params.access.token);
      return {
        ...state,
        account: {
          ...state.account,
          tokens: action.params,
        },
      };
    default:
      return state;
  }
};
