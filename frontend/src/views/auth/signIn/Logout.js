import Cookies from 'js-cookie';
import APIClient, { clearAuthToken } from '../../../lib/APIClient';

const Logout = (props) => {
  const config = {
    headers: { 'X-CSRFToken': Cookies.get('csrftoken') },
  };
  APIClient.post('/rest-auth/logout/', {}, config)
    .then(() => {
      clearAuthToken();
      if (!props) {
        window.location.href = '/auth/sign-in';
      } else {
        window.location.href = '/auth/sign-in';
      }
    })
    .catch(console.log);
};

export default Logout;
