import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CardGrid from '../components/items/CardGrid'
import PlayBar from '../components/ui/PlayBar'
import Ionicons from '@react-native-vector-icons/ionicons';
import Text from '../components/ui/Text'
import { horizontalScale } from '../../utils/responsive';

const Search = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.container1}
        onPress={() => navigation.navigate('SearchBar')}
        activeOpacity={0.8}
      >
        <View style={styles.innerContainer}>
          <Ionicons name="search" size={20} color="gray" />
          <Text color='black' size={15}>Artists, songs, or podcasts</Text>
        </View>
      </TouchableOpacity>
      <CardGrid />
      <PlayBar />
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  

  },
  container1: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: horizontalScale(50),
    marginHorizontal: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})