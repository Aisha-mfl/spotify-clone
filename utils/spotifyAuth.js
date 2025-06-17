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
