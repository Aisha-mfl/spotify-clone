import { Image, ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import List from '../components/items/List'
import { images } from '../assets/images'
import SongCards from '../components/items/SongCards'
import Songs from '../components/items/Songs'
import PlayBar from '../components/ui/PlayBar'
import Text from '../components/ui/Text'
import { horizontalScale, moderateScale, verticalScale } from '../../utils/responsive'


const HomeScreen = () => {
  return (
    <>
      <ScrollView contentContainerStyle={{ backgroundColor: '#111111' }}>
        <View style={styles.container}>
          <List />
          <View style={styles.reviewcontiner}>
            <Image source={images.review} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.text} size={10} color='#9C9C9C'>#SPOTIFYWRAPPED</Text>
              <Text style={styles.texts} weight='bold' size={moderateScale(20)}>Your 2021 in review</Text>
            </View>
          </View>
          <SongCards />
          <Songs />

        </View>
      </ScrollView>
      <PlayBar />
    </>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
    paddingTop:10

  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 1,
  },
  listContainer: {
    flex: 1,
    alignItems: 'center',
  },
  reviewcontiner: {
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: 'row'
  },
  image: {
    width: horizontalScale(58),
    height: verticalScale(58),
    marginHorizontal:horizontalScale(5)
  },
  textContainer: {
    marginHorizontal: horizontalScale(10),
    marginVertical: verticalScale(5),
    justifyContent: 'center',

  },
})