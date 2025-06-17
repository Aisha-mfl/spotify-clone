import { FlatList, Image, StyleSheet,TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { horizontalScale, verticalScale } from '../../utils/responsive';
import Text from '../components/ui/Text';

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
        <Text size={16}>{item?.title}</Text>
        <Text color='#b3b3b3' >
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
        <Text color='#b3b3b3' size={17} marginV={10}>You haven't liked any songs yet</Text>
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
  listContent: {
    paddingBottom: verticalScale(80),
  },
});

export default LikedSongs;