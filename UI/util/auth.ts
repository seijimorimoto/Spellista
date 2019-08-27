import { AuthSession } from 'expo';
import { spotifyCredentials } from './secrets';
import { encode as btoa } from 'base-64';
import { setUserData, getUserData } from './asyncStorage';

const scopesArr = ['playlist-read-collaborative', 'playlist-read-private'];
const scopes = scopesArr.join(' ');

const getSpotifyCredentials = () => {
  return spotifyCredentials;
};

const getAuthorizationCode = async () => {
  let result;
  try {
    const credentials = await getSpotifyCredentials();
    const redirectUrl = AuthSession.getRedirectUrl();
    result = await AuthSession.startAsync({
      authUrl:
        'https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' +
        credentials.clientId +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' +
        encodeURIComponent(redirectUrl)
    });
  } catch (err) {
    console.error(err);
  }

  return result.params.code;
};

const getTokens = async () => {
  try {
    const authorizationCode = await getAuthorizationCode();
    const credentials = await getSpotifyCredentials();
    const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${credentials.redirectUri}`
    });

    const responseJson = await response.json();

    // destructure the response and rename the properties to be in camelCase.
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn
    } = responseJson;

    const expirationTime = new Date().getTime() + expiresIn * 1000;
    await setUserData('accessToken', accessToken);
    await setUserData('refreshToken', refreshToken);
    await setUserData('expirationTime', expirationTime.toString());
  } catch (err) {
    console.error(err);
  }
};

const refreshTokens = async () => {
  try {
    const credentials = await getSpotifyCredentials();
    const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
    const refreshToken = await getUserData('refreshToken');

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`
    });
    const responseJson = await response.json();

    if (responseJson.error) {
      await getTokens();
    } else {
      const {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        expires_in: expiresIn
      } = responseJson;

      const expirationTime = new Date().getTime() + expiresIn * 1000;
      await setUserData('accessToken', newAccessToken);
      if (newRefreshToken) {
        await setUserData('refreshToken', newRefreshToken);
      }
      await setUserData('expirationTime', expirationTime.toString());
    }
  } catch (err) {
    console.error(err);
  }
};

const loginWithSpotify = async () => {
  const tokenExpirationTime = await getUserData('expirationTime');
  if (!tokenExpirationTime) {
    await getTokens();
  } else if (new Date().getTime() > new Date(tokenExpirationTime).getTime()) {
    await refreshTokens();
  }
};

const isLoggedIn = async () => {
  const tokenExpirationTime = await getUserData('expirationTime');
  return tokenExpirationTime !== null;
};

export { loginWithSpotify, isLoggedIn };
