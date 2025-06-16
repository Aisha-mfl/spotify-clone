import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { horizontalScale, verticalScale } from '../../utils/responsive';

const LikedSongs = () => {
  const navigation = useNavigation();
  const favoriteTracks = useSelector(state => state.favorites.ids); 
  
  const renderTrackItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.trackItem}
      onPress={() => navigation.navigate('playView', { track: item })}
    >
      <Image 
        source={{ uri: item?.artwork}} 
        style={styles.trackImage}
      />
      <View style={styles.trackInfo}>
        <Text style={styles.trackName} numberOfLines={1}>{item?.title}</Text>
        <Text style={styles.artistName} numberOfLines={1}>
          {item.artist}
        </Text>
      </View>
      <Ionicons name="heart" size={24} color="#1DB954" />
    </TouchableOpacity>
  );

  if (favoriteTracks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="musical-notes" size={60} color="#535353" />
        <Text style={styles.emptyText}>You haven't liked any songs yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteTracks}
        renderItem={renderTrackItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  emptyText: {
    color: '#b3b3b3',
    fontSize: 16,
    marginTop: 20,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(16),
    borderBottomWidth: 0.5,
    borderBottomColor: '#282828',
  },
  trackImage: {
    width: horizontalScale(60),
    height: horizontalScale(60),
    borderRadius: 90,
    marginRight: horizontalScale(12),
  },
  trackInfo: {
    flex: 1,
  },
  trackName: {
    color: 'white',
    fontSize: 16,
    marginBottom: 4,
  },
  artistName: {
    color: '#b3b3b3',
    fontSize: 14,
  },
  listContent: {
    paddingBottom: verticalScale(80),
  },
});

export default LikedSongs;