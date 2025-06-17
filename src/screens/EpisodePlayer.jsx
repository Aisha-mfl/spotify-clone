import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { getEpisodes } from '../../utils/spotifyApi';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from '@react-native-vector-icons/entypo';
import Ionicons from '@react-native-vector-icons/ionicons';
import PlayBar from '../components/ui/PlayBar';
import { useSelector } from 'react-redux';
import { togglePlay } from '../../store/Player';
import { useNavigation } from '@react-navigation/native';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import Text from '../components/ui/Text';
import { Track } from '../models/Tracks';

const EpisodePlayer = ({ route }) => {
  const { shows } = route.params;
  const [loading, setLoading] = useState(true);
  const [likeditem, setlikedItem] = useState(false);
  const navigation = useNavigation();
  const clicked = useSelector(state => state.player.isplaying);


  const [episodes, setepisodes] = useState([]);

  useEffect(() => {
    const fetchEpisodeData = async () => {
      setLoading(true);
      try {
        const data = await getEpisodes(shows.id);
        setepisodes(data);
      } catch (error) {
        console.error('Error fetching episode data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodeData();
  }, []);

  if (loading) {
    return <LoadingOverlay message='searching episodes....' />
  };
  const handleEpisodes = async (track, index) => {
    const artworkImage = shows?.images?.[0]?.url;

    await Track({
      track,
      index,
      allTracks: episodes,
      artworkImage,
      type: 'episode'
    });

    navigation.navigate('playView');
  };


  const renderEpisodeItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {handleEpisodes(item, index) }}
    >

      <View style={styles.episodeItem}>
        <Image
          source={{ uri: item.images?.[0]?.url}}
          style={styles.episodeImage}
        />
        <View style={styles.episodeInfo}>
          <Text weight='bold' size={15}>
            {item.name}
          </Text>
          <Text weight='semibold' size={14} >
            {item.description.replace(/<[^>]*>/g, '')}
          </Text>
          <Text size={12} color='#888' >
            {new Date(item.release_date).toLocaleDateString()} • {Math.floor(item.duration_ms / 60000)} min
          </Text>
        </View>
        <Entypo
          name='dots-three-horizontal'
          size={20}
          color="white"
          style={styles.episodeMenuIcon}
        />
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
              source={{ uri: shows.images[0]?.url }}
              style={styles.albumArt}
            />
          </View>
          <View style={styles.albumInfo}>
            <Text weight='bold' size={20}>Episodes by {shows.name}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text size={16}>
                {shows.publisher} . Total Episodes {shows.total_episodes} - {shows.type}
              </Text>


              <TouchableOpacity onPress={() => dispatch(togglePlay(!clicked))}>
                <Ionicons
                  name={clicked ? 'pause-circle-sharp' : 'play-circle-sharp'}
                  size={50}
                  color="#1DB954"
                  style={{ marginLeft: 60 }}
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
          data={episodes}
          renderItem={renderEpisodeItem}
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
    paddingBottom: 10,
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
  episodeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
    gap: 12,
  },

  episodeImage: {
    width: 80,
    height: 80,
    borderRadius: 6,
  },
  episodeInfo: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },

});


export default EpisodePlayer;
