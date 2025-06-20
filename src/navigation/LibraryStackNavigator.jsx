import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Playlist from '../screens/Playlist';
import Entypo from '@react-native-vector-icons/entypo';
import { images } from '../assets/images';
import { Image } from 'react-native';
import ArtistAlbumList from '../screens/ArtistAlbumList';
import ShowsScreen from '../screens/ShowsScreen';
import EpisodePlayer from '../screens/EpisodePlayer';
import PlayView from '../screens/PlayView';
import Ionicons from '@react-native-vector-icons/ionicons';
import LikedSongs from '../screens/likedSongs';
import Library from '../screens/Library';

const Stack = createNativeStackNavigator();

const LibraryStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            headerTitleStyle: {
                color: 'white',
                fontSize: 24
            },
            headerStyle: { backgroundColor: '#111111'},
            contentStyle: {
                backgroundColor: '#111111', 
            },
            headerTintColor:'white'

        }}>
            <Stack.Screen name="LibraryHome" component={Library} options={{
                headerShown: true,
                headerTitleStyle: {
                    color: 'white',
                    fontSize: 24
                },
                headerRight: () => {
                    return <Entypo name='plus' size={24} color="white" />
                },
                headerLeft: () => {
                    return <Image style={{ marginHorizontal: 10 }} source={images.profile} />
                },

                title: 'Your Library',


            }} />
            <Stack.Screen name="Playlist" component={Playlist} />
            <Stack.Screen name="albumlist" component={ArtistAlbumList}  />
            <Stack.Screen name="showsScreen" component={ShowsScreen} />
            <Stack.Screen name="EpisodeScreen" component={EpisodePlayer} />
            <Stack.Screen name="likedscreen" component={LikedSongs} options={{
                title:'Your Liked Songs'
            }} />
            

        </Stack.Navigator>
    );
};

export default LibraryStackNavigator;
