// services/trackPlayerService.js
import TrackPlayer from 'react-native-track-player';
import { store } from '../../store/store';
import { setCurrentPlaylist, setcurrTrack, togglePlay } from '../../store/Player';

export const Track = async ({
  track,
  index,
  allTracks,
  artworkImage,
  type
}) => {
  try {
    const { dispatch } = store;

    dispatch(setCurrentPlaylist({
      tracks: allTracks,
      index,
      queueType: type
    }));
    dispatch(setcurrTrack({
      name: track?.name || track?.title,
      artist: track.artists?.map(a => a.name).join(', ') || track.shows?.publisher || track?.artist || 'Unknown Artist',
      artwork: artworkImage,
      id: track.id,
      previewUrl: getPreviewUrl(track, type)
    }));



    await TrackPlayer.reset();
    await TrackPlayer.add(
      allTracks.map(t => createTrackObject(t, artworkImage, type))
    );


    await TrackPlayer.skip(index);
    await TrackPlayer.play();
    dispatch(togglePlay(true));
  } catch (error) {
    console.error('Playback error:', error);
    throw error;
  }
};

const getPreviewUrl = (track, type) => {
  return type === 'episode'
    ? track.audio_preview_url
    : "https://p.scdn.co/mp3-preview/e2e03acfd38d7cfa2baa924e0e9c7a80f9b49137?cid=8897482848704f2a8f8d7c79726a70d4";
};

const createTrackObject = (track, fallbackArtwork, type) => ({
  id: track.id,
  url: getPreviewUrl(track, type),
  title: track.name || track?.title,
  artist: track.artists?.map(a => a.name).join(', ') || track.shows?.publisher || track?.artist || 'Unknown Artist',
  artwork: track.album?.images?.[0]?.url || fallbackArtwork || track.shows?.images?.[0]?.url,
  type: type
});

export const playNextTrack = () => async (dispatch) => {
  try {
    await TrackPlayer.skipToNext();
    const track = await TrackPlayer.getActiveTrack();

    dispatch(setcurrTrack({
      id: track.id,
      name: track.title || track.name,
      title: track.title,
      artist: track.artist || track.shows?.publisher,
      artwork: track.artwork,
    }));
  } catch (err) {
    console.warn('No next track or error skipping:', err);
  }
};

export const playPreviousTrack = () => async (dispatch) => {
  try {
    await TrackPlayer.skipToPrevious();
    const track = await TrackPlayer.getActiveTrack();
    console.log('prev', track);


    dispatch(setcurrTrack({
      id: track.id,
      name: track.title || track.name,
      title: track.title || track.shows?.publisher,
      artist: track.artist,
      artwork: track.artwork,
    }));
  } catch (err) {
    console.warn('No previous track or error skipping:', err);
  }
};