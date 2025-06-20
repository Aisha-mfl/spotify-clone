import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../store/auth";
import AppNavigation from "./AppNavigation";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TrackPlayer, {
    AppKilledPlaybackBehavior,
    Capability,
    Event,
    useTrackPlayerEvents,
} from "react-native-track-player";
import { playNext } from "../../store/Player";
import { Alert } from "react-native";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="login"
            screenOptions={{
                headerStyle: { backgroundColor: '#111111' },
                contentStyle: { backgroundColor: '#111111' },
            }}>
            <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export const MainNavigation = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await AsyncStorage.getItem('token');
            if (storedToken) {
                
                dispatch(authenticate(storedToken));
            }
            console.log('tokens',storedToken );
            
        };
        fetchToken();
    }, []);


    useEffect(() => {
        const setupPlayer = async () => {
            if (isAuthenticated) {
                try {
                    await TrackPlayer.setupPlayer();
                    console.log("TrackPlayer setup complete");

                    await TrackPlayer.updateOptions({
                        android: {
                            appKilledPlaybackBehavior:
                                AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
                        },
                        capabilities: [
                            Capability.Play,
                            Capability.Pause,
                            Capability.SkipToNext,
                            Capability.SkipToPrevious,
                            Capability.SeekTo,
                        ],
                        compactCapabilities: [
                            Capability.Play,
                            Capability.Pause,
                            Capability.SkipToNext,
                        ],
                        progressUpdateEventInterval: 2,
                    });
                } catch (error) {
                    Alert.alert("The player has already been initialized via setupPlayer.")
                }
            }
        };

        setupPlayer();

    }, [isAuthenticated]);

    useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
        if (event.nextTrack != null) {
            dispatch(playNext()); 
        }
    });

    return (
        <>
            {!isAuthenticated ? <AuthStack /> : <AppNavigation />}
        </>
    );
};
