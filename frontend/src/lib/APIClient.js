import axios from 'axios';
import Cookies from 'js-cookie';

const APIClient = axios.create();
const TOKEN_KEY = 'token';
APIClient.defaults.xsrfCookieName = 'csrftoken'
APIClient.defaults.xsrfHeaderName = 'X-CSRFToken'
export const clearAuthToken = () => {
  Cookies.remove(TOKEN_KEY);
  APIClient.defaults.headers.common.Authorization = undefined;
};

APIClient.interceptors.request.use(
  (requestConfig) => {
    const config = { ...requestConfig };
    const token = Cookies.get(TOKEN_KEY);
    if (token) {
      config.headers.authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
APIClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    const isLoginUrl = window.location.href.includes('/login');
    if (error.response.status === 401 && !isLoginUrl) {
      clearAuthToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const loggedInUser = () => !(Cookies.get(TOKEN_KEY) === undefined);

export const getLoggedInUser = () =>
  APIClient.get('/rest-auth/user/').then((response) => response.data);

export const getFromRoute = (route) =>
  APIClient.get(route).then((response) => response.data);

export default APIClient;
