import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { getArtistsAlbums } from '../../utils/spotifyApi';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from '@react-native-vector-icons/entypo';
import Ionicons from '@react-native-vector-icons/ionicons';
import PlayBar from '../components/ui/PlayBar';
import { useSelector } from 'react-redux';
import { togglePlay } from '../../store/Player';
import { formatFollowers} from '../../utils/helpers';
import { useNavigation } from '@react-navigation/native';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import Text from '../components/ui/Text';

const ArtistAlbumList = ({ route }) => {
  const { artist } = route.params;
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likeditem, setlikedItem] = useState(false);
  const navigation = useNavigation();
  const clicked = useSelector(state => state.player.isplaying)

  useEffect(() => {
    const fetchAlbums = async () => {
      setLoading(true);
      try {
        const result = await getArtistsAlbums(artist.id);
        setAlbums(result.items);
      } catch (error) {
        console.error('Failed to fetch albums:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);
  
  if (loading) {
    return <LoadingOverlay message='searching albums....' />
  }

  const renderAlbum = ({ item }) => (
    <TouchableOpacity
      style={styles.trackItem}
      onPress={() => navigation.navigate('Playlist', {
        type: 'album',
        albumId: item.id,
        albumName: item.name
      })}
    >
      <Image source={{ uri: item.images[0]?.url }} style={styles.albumimage} />
      <View style={styles.trackInfo}>
        <Text weight='bold' size={15}>{item.name}</Text>
        <Text size={13}>
          {item.artists.map(artist => artist.name).join(', ')}
        </Text>
        <Text color='#ccc'>{item.release_date}</Text>
      </View>
    </TouchableOpacity>
  );
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
              source={{ uri: artist.images[0]?.url }}
              style={styles.albumArt}
            />
          </View>
          <View style={styles.albumInfo}>
            <Text weight='bold' size={20}>Albums by {artist.name}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text  size={16}>
                {formatFollowers(artist.followers.total)} Followers
              </Text>


              <TouchableOpacity onPress={() => dispatch(togglePlay(!clicked))}>
                <Ionicons
                  name={clicked ? 'pause-circle-sharp' : 'play-circle-sharp'}
                  size={50}
                  color="#1DB954"
                  style={{ marginLeft: 200 }}
                />
              </TouchableOpacity>

            </View>
            <View style={styles.icons}>
              <TouchableOpacity onPress={() => setlikedItem(!likeditem)}>
                <Entypo
                  name={likeditem ? 'heart' : 'heart-outlined'}
                  size={26}
                  color="#1DB954"
                />
              </TouchableOpacity>
              <Entypo
                name='dots-three-horizontal'
                size={24}
                color="white"
              />
            </View>
          </View>
        </View>
        <FlatList
          data={albums}
          renderItem={renderAlbum}
          keyExtractor={(item) => item.id}
        />
      </View>
      <PlayBar />
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 80,
  },
  linearGradient: {
    flex: 1,
  },
  albumimage: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginRight: 12,
  },
  header: {
    marginHorizontal: 20,
    marginTop: 60,
    marginBottom: 10,
  },
  headerIcon: {
    width: 24,
  },
  image: {
    alignItems: 'center',
    marginVertical: 20,
  },
  albumHeader: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  albumArt: {
    width: 220,
    height: 220,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  albumInfo: {
    marginTop: 10,
  },
  
  icons: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  trackInfo: {
    flex: 1,
    marginRight: 10,
  },

});


export default ArtistAlbumList;
