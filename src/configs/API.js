const API_ROOT = 'http://localhost:3001';

const API = {
  AUTH: {
    REGISTER: API_ROOT + '/auth/register',
    LOGIN: API_ROOT + '/auth/login',
    LOGOUT: API_ROOT + '/auth/logout',
    FORGOT_PASSWORD: API_ROOT + '/auth/forgot-password',
    RESET_PASSWORD: API_ROOT + '/auth/reset-password',
    REFRESH_TOKENS: API_ROOT + '/auth/refresh-tokens'
  },
  USER: {
    LIST_USER: API_ROOT + '/users/list-user',
    LIST_ADMIN: API_ROOT + '/users/list-admin',
  }
}

export default API;
