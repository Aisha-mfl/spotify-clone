import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Playlist from '../screens/Playlist';
import Ionicons from '@react-native-vector-icons/ionicons';
import Search from '../screens/Search';
import ArtistAlbumList from '../screens/ArtistAlbumList';
import SearchBar from '../screens/SearchBar';

const Stack = createNativeStackNavigator();

const SearchStackNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{
        headerTitleStyle: {
            color: 'white',
            fontSize: 24
        },
        contentStyle: {
                backgroundColor: '#111111', 
            },
        
    }}>
            <Stack.Screen name="SearchHome" component={Search} options={{

                headerStyle: { backgroundColor: '#111111' },
                headerRight: () => {
                    return <Ionicons name='camera-outline' size={30} color="white" />
                },
                title: 'Search',


            }} />
            <Stack.Screen name='SearchBar' component={SearchBar} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Playlist" component={Playlist} options={{
                headerShown: false
            }}/>
            <Stack.Screen name="albumlist" component={ArtistAlbumList} options={{
                headerShown: false
            }}/>
            
        </Stack.Navigator>
    );
};

export default SearchStackNavigation;
