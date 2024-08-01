import inMemoryJWT from './inMemoryJWT';

const authProvider = {
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

        inMemoryJWT.setRefreshTokenEndpoint('auth/realms/formed-api/protocol/openid-connect/token');

        return fetch(request)
            .then((response) => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((token) => {
                return inMemoryJWT.setToken(token.access_token, token.expires_in, token.refresh_token);
            });
    },

    logout: () => {
        const details = {
            'client_id': 'frontend',
            'refresh_token': inMemoryJWT.getToken(true)
          };

        const formBody = Object.entries(details).map(([key, value]) => 
            encodeURIComponent(key) + '=' + encodeURIComponent(value)).join('&')

        const request = new Request('auth/realms/formed-api/protocol/openid-connect/logout', {
            method: 'POST',
            body: formBody,
            headers: new Headers({ 
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }),
        });
        inMemoryJWT.ereaseToken();

        return fetch(request).then(() => '/login');
    },

    checkAuth: () => {
        return inMemoryJWT.waitForTokenRefresh().then(() => {
            return inMemoryJWT.getToken() ? Promise.resolve() : Promise.reject();
        });
    },

    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            inMemoryJWT.ereaseToken();
            return Promise.reject();
        }
        return Promise.resolve();
    },

    getPermissions: () => {
        return inMemoryJWT.waitForTokenRefresh().then(() => {
            return inMemoryJWT.getToken() ? Promise.resolve() : Promise.reject();
        });
    },
};

export default authProvider; 
