// // src/api/spotifyAuth.js
// import {authorize} from 'react-native-app-auth';

// const config = {
//   clientId: 'e6978bba79cf42c08722bf295ae2224f',
//   redirectUrl: 'myapp://callback',
//   clientSecret: 'c6c0c46c57674418b331f498268ecccd',
//   scopes: ['user-read-private', 'playlist-read-private'],
//   serviceConfiguration: {
//     authorizationEndpoint: 'https://accounts.spotify.com/authorize',
//     tokenEndpoint: 'https://accounts.spotify.com/api/token',
//   },
// };

// export const getAccessToken = async () => {
 

//   const body = new URLSearchParams({
//     grant_type: 'client_credentials',
//     client_id: clientId,
//     client_secret: clientSecret,
//   }).toString();

//   try {
//     const response = await fetch('https://accounts.spotify.com/api/token', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body,
//     });

//     const data = await response.json();

//     if (response.ok) {
//       console.log('Access Token:', data.access_token);
//     } else {
//       console.error('Error getting access token:', data);
//     }
//   } catch (error) {
//     console.error('Fetch failed:', error);
//   }
// };
// export const loginToSpotify = async () => {
//   try {
//     const result = await authorize(config);
//     console.log('Access token:', result.accessToken);
//     console.log('Refresh token:', result.refreshToken);
//     // Save tokens as needed
//     return result;
//   } catch (error) {
//     console.error('Spotify login error:', error);
//     throw error;
//   }
// };

// src/api/spotifyAuth.js

const clientId = 'e6978bba79cf42c08722bf295ae2224f';
const clientSecret = 'c6c0c46c57674418b331f498268ecccd';

export const getAccessToken = async () => {
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
  }).toString();

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });
    const data = await response.json();
    if (response.ok) {
      return data.access_token;
    } else {
      console.error('Error getting access token:', data);
      return null;
    }
  } catch (error) {
    console.error('Fetch failed:', error);
    return null;
  }
};
