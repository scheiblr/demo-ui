const inMemoryJWTManager = () => {
    let inMemoryJWT = null;
    let isRefreshing = null;
    let inMemoryRefreshToken = null;
    let logoutEventName = 'ra-logout';
    let refreshEndpoint = '/refresh-token';
    let refreshTimeOutId;

    const setLogoutEventName = name => logoutEventName = name;
    const setRefreshTokenEndpoint = endpoint => refreshEndpoint = endpoint;

    // This countdown feature is used to renew the JWT before it's no longer valid
    // in a way that is transparent to the user.
    const refreshToken = (delay) => {
        refreshTimeOutId = window.setTimeout(
            getRefreshedToken,
            delay * 1000 - 5000
        ); // Validity period of the token in seconds, minus 5 seconds
    };

    const abordRefreshToken = () => {
        if (refreshTimeOutId) {
            window.clearTimeout(refreshTimeOutId);
        }
    };

    const waitForTokenRefresh = () => {
        if (!isRefreshing) {
            return Promise.resolve();
        }
        return isRefreshing.then(() => {
            isRefreshing = null;
            return true;
        });
    };

    // The method make a call to the refresh-token endpoint
    // If there is a valid cookie, the endpoint will set a fresh jwt in memory.
    const getRefreshedToken = () => {
        const details = {
            'refresh_token': inMemoryRefreshToken,
            'grant_type': 'refresh_token',
            'client_id': 'frontend'
          };

        const formBody = Object.entries(details).map(([key, value]) => 
            encodeURIComponent(key) + '=' + encodeURIComponent(value)).join('&');

        const request = new Request(refreshEndpoint, {
            method: 'POST',
            body: formBody,
            headers: new Headers({ 
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }),
        });

        isRefreshing = fetch(request)
            .then((response) => {
                if (response.status !== 200) {
                    ereaseToken();
                    console.log(
                        'Token renewal failure'
                    );
                    return { token: null };
                }
                return response.json();
            })
            .then(( token ) => {
                if (token) {
                    setToken(token.access_token, token.expires_in, token.refresh_token);
                    return true;
                }
                ereaseToken();
                return false;
            });

        return isRefreshing;
    };

    const getToken = (refresh) => (refresh) ? inMemoryRefreshToken : inMemoryJWT;

    const setToken = (token, delay, rToken) => {
        inMemoryJWT = token;
        inMemoryRefreshToken = rToken;
        refreshToken(delay);
        return true;
    };

    const ereaseToken = () => {
        inMemoryJWT = null;
        inMemoryRefreshToken = null;
        abordRefreshToken();
        window.localStorage.setItem(logoutEventName, Date.now());
        return true;
    };

    // This listener will allow to disconnect a session of ra started in another tab
    window.addEventListener('storage', (event) => {
        if (event.key === logoutEventName) {
            inMemoryJWT = null;
        }
    });

    return {
        ereaseToken,
        getRefreshedToken,
        getToken,
        setLogoutEventName,
        setRefreshTokenEndpoint,
        setToken,
        waitForTokenRefresh,
    };
};

export default inMemoryJWTManager();
