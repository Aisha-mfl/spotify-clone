import Entypo from '@react-native-vector-icons/entypo';
import Ionicons from '@react-native-vector-icons/ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import LibraryStackNavigator from './LibraryStackNavigator';
import SearchStackNavigation from './SearchStackNavigation';



const BottomTab = createBottomTabNavigator();

const Tabnavigator = () => {
    return (
        <BottomTab.Navigator
            screenOptions={({ route }) => ({
                headerShown: true,
                tabBarActiveTintColor: '#ffffff',
                tabBarInactiveTintColor: '#111111',
                tabBarStyle: { backgroundColor: '#111111' },
                tabBarLabelStyle: { fontSize: 13, color: 'white' },

                tabBarIcon: ({ size, focused }) => {
                    let iconName;
                    if (route.name === 'Home') iconName = 'home';
                    else if (route.name === 'Search') iconName = 'search';
                    else if (route.name === 'Library') iconName = 'library';
                    const iconColor = focused ? '#ffffff' : '#333131';

                    return <Ionicons name={iconName} size={size} color={iconColor} />;
                },
            })}
        >
            <BottomTab.Screen name='Home' component={HomeStackNavigator} options={{headerShown:false}}/>
            <BottomTab.Screen name='Search' component={SearchStackNavigation}
               options={{headerShown:false}} />
            <BottomTab.Screen name='Library' component={LibraryStackNavigator} options={{headerShown:false}}/>

        </BottomTab.Navigator >
    );
};

export default Tabnavigator;
