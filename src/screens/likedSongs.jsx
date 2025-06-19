import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
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

const LikedSongs = ({ navigation }) => {

  const [likeditem, setlikedItem] = useState(false);
  const [loading, setLoading] = useState(true);
  const currentTrack = useSelector(state => state.player.currTrack);
  const clicked = useSelector(state => state.player.isplaying);
  const favoriteTracks = useSelector(state => state.favorites.ids);
  const dispatch = useDispatch();



  if (!loading) {
    return <LoadingOverlay message='searching Playlist....' />
  }
  if (favoriteTracks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="musical-notes" size={60} color="#535353" />
        <Text color='#b3b3b3' size={17} marginV={10}>You haven't liked any songs yet</Text>
      </View>
    );
  }

  const renderTrackItem = ({ item }) => {
    const isActive = currentTrack?.id === item.id;
    return (
      <TouchableOpacity
        style={[styles.trackItem, isActive && styles.activeTrack]}
        onPress={() => navigation.navigate('playView', {
          tracks: favoriteTracks,
          index: favoriteTracks.findIndex(t => t.id === item.id),
          type: 'song'
        })}

      >
        <View style={styles.trackInfo}>
          <Image
            source={{ uri: item.artwork }}
            style={styles.trackImage}
          />
          <View style={{ flexDirection: 'row' }}>
            {isActive &&
              <Ionicons name='stats-chart'
                size={18}
                color="#1DB954"
              />
            }
          </View>
          <View style={{ marginVertical: 3 }}>
            <Text size={14} weight='bold' color={isActive ? '#1DB954' : 'white'}>{item?.title}</Text>
            <View style={{ flexDirection: 'row', marginVertical: 3 }}>
              <Image source={images.down} style={styles.downicon} />
              <Text size={14} marginH={5}>
                {item.artist}
              </Text>
            </View>
          </View>
        </View>
        <Entypo
          name='dots-three-horizontal'
          size={18}
          color="white"
          style={{ marginRight: 10 }}
        />

      </TouchableOpacity>
    );
  }

  return (
    <LinearGradient colors={['#353150', '#4d519b', '#4f6368']} style={styles.linearGradient}>
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
              source={images.rect}
              style={styles.albumArt}
            />
          </View>
          <View style={styles.albumInfo}>
            <Text weight='bold' size={25}>Liked Songs</Text>

            <TouchableOpacity onPress={() => dispatch(togglePlay(!clicked))}>
              <Ionicons
                name={clicked ? 'pause-circle-sharp' : 'play-circle-sharp'}
                size={50}
                color="#1DB954"
                style={{ marginLeft: 300 }}
              />
            </TouchableOpacity>

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
        <FlatList
          data={favoriteTracks}
          renderItem={renderTrackItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />


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
    marginVertical: 10,
  },
  albumHeader: {
    marginHorizontal: 25,
  },

  albumArt: {
    width: horizontalScale(230),
    height: verticalScale(230),
    alignItems: 'center',
    marginVertical: 10,
  },
  icons: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 10,
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
    borderBottomColor: '#65648f',
  },
  trackImage: {
    width: horizontalScale(50),
    height: horizontalScale(50),
    marginRight: verticalScale(10)
  },

  trackInfo: {
    flex: 1,
    marginHorizontal: 10,
    flexDirection: 'row'
  },
  downicon: {
    width: horizontalScale(14),
    height: verticalScale(14)
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },

});

export default LikedSongs;
