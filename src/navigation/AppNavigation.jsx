import { StyleSheet, Text, View } from 'react-native'
import React, { use } from 'react'
import Entypo from '@react-native-vector-icons/entypo';
import Ionicons from '@react-native-vector-icons/ionicons';
import Tabnavigator from './TabNavigator'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PlayView from '../screens/PlayView'



const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: '#111111' },
            contentStyle: { backgroundColor: '#111111' },
            headerTintColor: 'white',
        }}>
            <Stack.Screen name='tab' component={Tabnavigator} options={{ headerShown: false }} />
            <Stack.Screen name='playView' component={PlayView}
                options={({ navigation }) => ({
                    headerShown: false,
                    presentation: 'modal',
                    animation: 'slide_from_bottom',
                    headerTitle: '', // Empty title
                    headerStyle: { backgroundColor: '#111111' },
                    headerLeft: () => (
                        <Ionicons
                            name='chevron-down'
                            size={24}
                            color="white"
                            onPress={() => navigation.goBack()}
                            style={{ marginRight: 15, backgroundColor: 'red' }}
                        />
                    ),
                    headerRight: () => (
                        <Entypo
                            name='dots-three-horizontal'
                            size={24}
                            color="white"
                            onPress={() => console.log('Menu pressed')}
                        />
                    ),
                })} />
        </Stack.Navigator>
    )
}

export default AppNavigation;
