// HomeStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Playlist from '../screens/Playlist';
import HomeScreen from '../screens/HomeScreen';
import Ionicons from '@react-native-vector-icons/ionicons';
import Header from '../components/ui/Header';
import ArtistAlbumList from '../screens/ArtistAlbumList';



const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => (
    <HomeStack.Navigator screenOptions={{
       
        headerTitleStyle: {
            color: 'white',
            fontSize: 24,
            
        },
         headerStyle: {
                backgroundColor: '#111111', 
            },
            contentStyle: {
                backgroundColor: '#111111', 
            },
        
    }}>
        <HomeStack.Screen name="home" component={HomeScreen} options={{
            headerShown: true,
            headerStyle: { backgroundColor: '#111111' },
            headerRight: () => {
                return <Header />
            },
            title: 'Recently Played',
        }} />
        <HomeStack.Screen name="Playlist" component={Playlist} options={({ navigation }) => ({
            headerShown: false,
            presentation: 'modal',
            headerLeft: () => (
                <Ionicons
                    name='chevron-down'
                    size={24}
                    color="white"
                    onPress={() => navigation.goBack()}
                    style={{ marginRight: 15 }}
                />
            ),
        })} />
        <HomeStack.Screen name="albumlist" component={ArtistAlbumList}
            options={{
                headerShown: false
            }}
        />
    </HomeStack.Navigator>
);

export default HomeStackNavigator;
