import axios from 'axios';
import {getAccessToken} from './spotifyAuth';

let accessToken = null;

const spotifyApi = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
});

// Add Authorization header before each request
spotifyApi.interceptors.request.use(
  async config => {
    if (!accessToken) {
      accessToken = await getAccessToken();
    }
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  error => Promise.reject(error),
);

// Handle token expiration and retry
spotifyApi.interceptors.response.use(
  response => response,
  async error => {
    if (
      error.response &&
      error.response.status === 401 &&
      !error.config._retry
    ) {
      error.config._retry = true;
      accessToken = await getAccessToken();
      error.config.headers.Authorization = `Bearer ${accessToken}`;
      return spotifyApi(error.config);
    }

    return Promise.reject(error);
  },
);

export const getMultipleArtists = async (ids = []) => {
  const idParam = ids.join(',');
  const response = await spotifyApi.get(`artists`, {
    params: {ids: idParam},
  });
  return response.data.artists;
};

export const getArtistsAlbums = async artistId => {
  
  try {
    const response = await spotifyApi.get(`artists/${artistId}/albums`);
    return response.data;
  } catch (error) {
    console.error('Error in getMultipleAlbum:', error.response.data);
   
  }
};

export const getMultipleAlbum = async (ids = []) => {
  try {
    const idParam = ids.join(',');
    const response = await spotifyApi.get(`albums`, {
      params: {ids: idParam},
    });
    return response.data.albums;
  } catch (error) {
    console.error('Error in getMultipleAlbum:', error);

  }
};

export const getAlbumDetails = async albumId => {
  try {
    const response = await spotifyApi.get(`albums/${albumId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching album details:', error);
   
  }
};
export const getAlbumTracks = async albumId => {
  try {
    const response = await spotifyApi.get(`albums/${albumId}/tracks`);
    return response.data.items;
  } catch (error) {
    console.error('Error fetching album tracks:', error);
  }
};

export const getMultipleTracks = async (trackIds = []) => {
  try {
    const ids = trackIds.slice(0, 50).join(',');
    const response = await spotifyApi.get(`tracks?ids=${ids}`);
    return response.data.tracks;
  } catch (error) {
    console.error('Error fetching tracks:', error);
  }
};

export const SearchApi = async (query, type = 'track,artist,album') => {
  try {
    const response = await spotifyApi.get(`search`, {
      params: {
        q: query,
        type: type,
        limit: 10,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error in searching :', error.message);
  }
};
export const getPlaylist = async playlistId => {
  try {
    const response = await spotifyApi.get(`playlists/${playlistId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching playlist:', error);
  }
};

export const getMultipleShows = async (ids = []) => {
  try {
    const idParam = ids.join(',');
    const response = await spotifyApi.get(`shows`, {
      params: {
        ids: idParam,
        market: 'US',
      },
    });
    return response?.data?.shows || [];
  } catch (error) {
    console.error('Error in getMultipleShows:', error);
  }
};
export const getEpisodes = async showId => {
  console.log('showId:', showId);
  try {
    const response = await spotifyApi.get(`shows/${showId}/episodes`, {
      params: {
        market: 'US',
      },
    });
    return response?.data?.items || [];
  } catch (error) {
    console.error('Error in getEpisodes:', error);
  }
};

export const fetchCategories = async (country = 'US', limit = 20) => {
  try {
    const response = await spotifyApi.get(`browse/categories`,{
      country,
      limit,
      locale: 'en_US'
    });
    console.log('categories',response);
    return response?.data?.categories?.items || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

export default spotifyApi;
