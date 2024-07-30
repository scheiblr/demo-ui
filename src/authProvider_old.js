// TODO: implement refresh token as described here: https://marmelab.com/blog/2020/07/02/manage-your-jwt-react-admin-authentication-in-memory.html

let timer = null;

const refreshToken = () => {
  const details = {
    'refresh_token': JSON.parse(localStorage.getItem('token')).refresh_token,
    'grant_type': 'refresh_token',
    'client_id': 'frontend'
  };

  const formBody = Object.entries(details).map(([key, value]) => 
    encodeURIComponent(key) + '=' + encodeURIComponent(value)).join('&')

  const request = new Request('auth/realms/formed-api/protocol/openid-connect/token', {
    method: 'POST',
    body: formBody,
    headers: new Headers({ 
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }),
  });
  
  return fetch(request)
    .then(response => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(token => {
      localStorage.setItem('token', JSON.stringify(token));
    })
    .catch(() => {
      throw new Error('Network error')
    });
};

const authProvider = {
  // authentication
  login: ({ username, password }) => {
    const details = {
      'username': username,
      'password': password,
      'grant_type': 'password',
      'client_id': 'frontend'
    };

    const formBody = Object.entries(details).map(([key, value]) => 
      encodeURIComponent(key) + '=' + encodeURIComponent(value)).join('&')

    const request = new Request('auth/realms/formed-api/protocol/openid-connect/token', {
      method: 'POST',
      body: formBody,
      headers: new Headers({ 
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }),
    });
    
    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(token => {
        localStorage.setItem('token', JSON.stringify(token));
        timer = setInterval(() => refreshToken(), token.expires_in - 10);
      })
      .catch(() => {
        throw new Error('Network error')
      });
  },
  

  logout: () => {
    clearInterval(timer);
    localStorage.removeItem('token');
    
    return Promise.resolve();
  },
  checkAuth: () => localStorage.getItem('token') 
    ? Promise.resolve() 
    : Promise.reject({ message: false }),
  checkError: error => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      return Promise.reject({ message: false });
    }
    return Promise.resolve();
  },
  getIdentity: () => {

  },
  // authorization
  getPermissions: params => {
    const role = JSON.parse(localStorage.getItem('role'))?.role;
    return role ? Promise.resolve(role) : Promise.reject();
  }
};

export default authProvider;