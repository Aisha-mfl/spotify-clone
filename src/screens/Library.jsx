import { Image, ScrollView, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import IconButton from '../components/ui/IconButton'
import { images } from '../assets/images'
import Cards from '../components/ui/Cards'
import List from '../components/items/List'
import SongCards from '../components/items/SongCards'
import { useSelector } from 'react-redux'
import PlayList from '../components/items/LibraryPlayList'
import PlayBar from '../components/ui/PlayBar'
import Text from '../components/ui/Text'
import ShowsScreen from './ShowsScreen'
import { horizontalScale, verticalScale } from '../../utils/responsive'


const Library = () => {
  const [activeTab, setActivetab] = useState('Playlists');
  const artists = useSelector((state) => state.library.artists);
  const albums = useSelector((state) => state.library.albums);
  const playlist = useSelector((state) => state.library.playlists);
  const shows = useSelector((state) => state.library.shows);
  const favoriteTracks = useSelector(state => state.favorites.ids);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', gap: 2 }}>
        {['Playlists', 'Artists', 'Albums', 'shows'].map(tab => (
          <IconButton
            key={tab}
            onPress={() => setActivetab(tab)}
            isActive={activeTab === tab}
          >
            {tab}
          </IconButton>
        ))}
      </View>

      <View style={styles.recnet}>
        <Image style={styles.arrow} source={images.arrow} />
        <Text style={styles.text} weight='bold' size={15}>Recently Played</Text>
        <View style={styles.icon}>
          <Image style={styles.menu} source={images.menu} />
        </View>
      </View>
      <Cards
        image={images.rect}
        text={'Liked Songs'}
        dec={"Playlist"}
        extraText={`${favoriteTracks.length} Favorite songs`}
      />
      <Cards
        image={images.rec}
        text={'New Episodes'}
        dec={'Updated 2 days ago'}
      />
      {activeTab === 'Playlists' && (
        <View style={{ flex: 1 }}>
          <PlayList
            data={playlist}
          />
        </View>
      )}
      {activeTab === 'Artists' && (
        <View style={{ flex: 1 }}>
          <List
            data={artists}
            horizontal={false}
            itemStyle={styles.artistItem}
          />
        </View>
      )}
      {activeTab === 'Albums' && (
        <View style={{ flex: 1 }}>
          <SongCards
            data={albums}
            horizontal={false}
            itemStyle={styles.albumItem}
          />
        </View>
      )}
      {activeTab === 'shows' && (
        <View style={{ flex: 1 }}>
          <ShowsScreen
            data={shows}
            horizontal={false}
            itemStyle={styles.albumItem}
          />
        </View>
      )}
      <PlayBar />
    </View>
  )
}

export default Library;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
  recnet: {
    flexDirection: 'row',
    marginVertical: verticalScale(25)
  },
  arrow: {
    width: horizontalScale(17),
    height: verticalScale(20),
    marginHorizontal: horizontalScale(10)
  },
  icon: {
    alignSelf: 'flex-end',
    marginLeft: horizontalScale(230)
  },

  albumContainer: {
    flex: 1,
  },
  albumItem: {
    flexDirection: 'row',
    marginHorizontal: horizontalScale(8),
    marginVertical: verticalScale(5),
    image: {
      width: horizontalScale(66),
      height: verticalScale(64),
      borderRadius: 50,
      marginTop: 4,
      resizeMode: 'cover',
    },
  },

  artistContainer: {
    flex: 1,
    backgroundColor: 'red',
    paddingHorizontal: 16,
  },
  artistItem: {
    flexDirection: 'row',
    marginHorizontal: horizontalScale(8),
    gap: 10,
    image: {
      width: horizontalScale(66),
      height: verticalScale(64),
      borderRadius: 50,
      marginTop: 4,
      resizeMode: 'cover',

    },
    textcontainer: {
      marginVertical: verticalScale(30),
      marginHorizontal: horizontalScale(5),
    },

  },

})