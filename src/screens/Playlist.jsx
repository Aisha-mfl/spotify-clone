import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { getAlbumTracks, getAlbumDetails } from '../../utils/spotifyApi';
import LinearGradient from 'react-native-linear-gradient';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import Entypo from '@react-native-vector-icons/entypo';
import Ionicons from '@react-native-vector-icons/ionicons';
import PlayBar from '../components/ui/PlayBar';
import { useDispatch, useSelector } from 'react-redux';
import { togglePlay, currTrack } from '../../store/Player';
import { msToMinutes } from '../../utils/helpers';
import Text from '../components/ui/Text';
import { horizontalScale, verticalScale } from '../../utils/responsive';
import { Track } from '../models/Tracks';
import { images } from '../assets/images';

const Playlist = ({ route, navigation }) => {
  const [tracks, setTracks] = useState([]);
  const [album, setAlbum] = useState(null);
  const [likeditem, setlikedItem] = useState(false);
  const [loading, setLoading] = useState(true);
  const type = route.params?.type;
  const albumId = route.params?.albumId;
  const { playlist = {} } = route.params || {};
  const currentTrack = useSelector(state => state.player.currTrack);
  const clicked = useSelector(state => state.player.isplaying)
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (type === 'album' && albumId) {
          const albumRes = await getAlbumDetails(albumId);
          const trackRes = await getAlbumTracks(albumId);
          setAlbum(albumRes);
          setTracks(trackRes);
        } else if (type === 'playlist') {
          setAlbum(null);
        }
      } catch (err) {
        console.error('Failed to load album data:', err.message);
      }
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, albumId]);

  if (loading) {
    return <LoadingOverlay message='searching Playlist....' />
  }
  const playlistTracks = playlist?.tracks?.items
    ? playlist.tracks.items
      .map(item => item?.track)
      .filter(track => track && track.id)
    : [];
  const handleTrackPress = async (track, index) => {
    const allTracks = type === 'album' ? tracks : playlistTracks;
    const artworkImage = type === 'album'
      ? album?.images?.[0]?.url
      : playlist?.images?.[0]?.url;

    await Track({
      track,
      index,
      allTracks,
      artworkImage,
      type: type === 'episode' ? 'episode' : 'song'
    });
  };

  const renderTrackItem = ({ item, index }) => {
    const isActive = currentTrack?.id === item.id;
    return (
      <TouchableOpacity
        style={[styles.trackItem, isActive && styles.activeTrack]}
        onPress={() => handleTrackPress(item, index)}
      >
        <View style={styles.trackInfo}>
          <View style={{ flexDirection: 'row' }}>
            {isActive &&
              <Ionicons name='stats-chart'
                size={15}
                color="#1DB954"
              />
            }
            <Text size={15} color={isActive ? '#1DB954' : 'white'}>{item.name} / {album?.name}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginVertical:3}}>
            <Image source={images.down} style={styles.downicon} />
            <Text size={14} marginH={5}>
              {item.artists.map(artist => artist.name).join(', ')}
            </Text>
          </View>
        </View>
        <Text size={12}>
          {msToMinutes(item.duration_ms)}
        </Text>
      </TouchableOpacity>
    );
  }
  if (!album && !playlist) {
    return (
      <LoadingOverlay message='loading.....' />
    );
  }

  return (
    <LinearGradient colors={['#d6c9d3', '#504b4b', '#101010']} style={styles.linearGradient}>
      <View style={styles.header}>
        <Ionicons
          name='chevron-down'
          size={24}
          color="white"
          onPress={() => navigation.goBack()}
          style={styles.headerIcon}
        />
      </View>

      <View style={styles.container}>
        <View style={styles.albumHeader}>
          <View style={styles.image}>
            <Image
              source={{
                uri: type === 'album' ? album?.images?.[0]?.url : playlist?.images?.[0]?.url
              }}
              style={styles.albumArt}
            />
          </View>
          <View style={styles.albumInfo}>
            <Text weight='bold' size={18}>{type === 'album' ? album?.name : playlist?.name}</Text>
            <Text size={16}>
              {type === 'album'
                ? album?.artists.map(artist => artist.name).join(', ')
                : playlist?.owner?.display_name}
            </Text>
            {!playlist &&
              <Text size={16}>{playlistTracks.length} tracks</Text>
            }
            <View style={{ flexDirection: 'row' }}>
              {album && album.release_date ? (
                <Text>
                  {album.release_date.split('-')[0]} • {album.total_tracks || playlistTracks.length} songs
                </Text>
              ) : (
                <Text >
                  {playlistTracks.length} songs
                </Text>
              )}
              <TouchableOpacity onPress={() => dispatch(togglePlay(!clicked))}>
                <Ionicons
                  name={clicked ? 'pause-circle-sharp' : 'play-circle-sharp'}
                  size={50}
                  color="#1DB954"
                  style={{ marginLeft: 220 }}
                />
              </TouchableOpacity>

            </View>
            <View style={styles.icons}>
              <TouchableOpacity onPress={() => setlikedItem(!likeditem)}>
                <Entypo
                  name={likeditem ? 'heart' : 'heart-outlined'}
                  size={26}
                  color="#1DB954"
                  style={{ marginVertical: -2 }}
                />
              </TouchableOpacity>
              <Image source={images.down} />
              <Entypo
                name='dots-three-horizontal'
                size={24}
                color="white"
              />
            </View>
          </View>
        </View>
        {playlistTracks.length > 0 ? (
          <FlatList
            data={playlistTracks}
            renderItem={renderTrackItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <FlatList
            data={tracks}
            renderItem={renderTrackItem}
            keyExtractor={(item) => item.id}
            style={styles.trackList}
          />
        )}


      </View>
      <PlayBar />
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  header: {
    marginHorizontal: 20,
    marginTop: 60,
  },
  headerIcon: {
    width: 24,
  },
  image: {
    alignItems: 'center',
    marginVertical: 10
  },
  albumHeader: {
    marginHorizontal: 25,
  },
  albumArt: {
    width: horizontalScale(234),
    height: verticalScale(236),
  },
  icons: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 10
  },
  trackList: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    marginHorizontal: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#282828',
  },

  trackInfo: {
    flex: 1,
    marginHorizontal: 2
  },
  downicon: {
    width: horizontalScale(14),
    height: verticalScale(14),
    marginVertical:2
  }

});

export default Playlist;
