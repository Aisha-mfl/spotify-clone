import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from '@react-native-vector-icons/entypo';
import Ionicons from '@react-native-vector-icons/ionicons';
import { images } from '../assets/images';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { togglePlay } from '../../store/Player';
import TrackPlayer, { Event, State, usePlaybackState, useProgress } from 'react-native-track-player';
import Text from '../components/ui/Text';
import { horizontalScale, verticalScale } from '../../utils/responsive';
import { formatTime } from '../../utils/helpers';
import { playNextTrack, playPreviousTrack, Track } from '../models/Tracks';
import { addFavorite, removefavorite } from '../../store/favorite';



const PlayView = ({ route, navigation }) => {
    const currentTrack = useSelector(state => state.player.currTrack);
    const track = route?.params?.track;
    const activeTrack = currentTrack || track;
    //console.log('playing', activeTrack);
    const dispatch = useDispatch();
    const playbackState = usePlaybackState();
    const { position, duration } = useProgress(200);
    const favSongid = useSelector(state => state.favorites.ids);
    const songisFav = favSongid.includes(activeTrack);

    useEffect(() => {
        if ((route.params?.tracks && Array.isArray(route.params.tracks)) || route.params?.track) {
            let currentTrack;
            let selectedIndex = 0;
            let trackList = [];

            if (Array.isArray(route?.params?.tracks)) {
                trackList = route.params.tracks;
                selectedIndex = route.params.index || 0;
                currentTrack = trackList[selectedIndex];
            } else if (route?.params?.track) {
                currentTrack = route.params.track;
                trackList = [currentTrack]; // fallback list of 1 item
            }

            if (!currentTrack) {
                console.warn('No valid track found');
                return;
            }

            const artwork =
                currentTrack?.album?.images?.[0]?.url ||
                currentTrack?.artwork ||
                null;

            Track({
                track: currentTrack,
                index: selectedIndex,
                allTracks: trackList,
                artworkImage: artwork,
                type: route.params.type || 'song',
            });
        }
    }, []);


    useEffect(() => {
        const listener = TrackPlayer.addEventListener(
            Event.PlaybackActiveTrackChanged,
            async ({ track }) => {
                console.log('curr', track);
                dispatch(setcurrTrack(track));
            }
        );
        return () => {
            listener.remove();
        };
    }, []);
    const togglePlayback = async () => {
        const stateValue = playbackState?.state || playbackState;

        console.log('Current Playback State:', stateValue);

        if (stateValue === State.Playing) {
            await TrackPlayer.pause();
            dispatch(togglePlay(false));
        } else if (
            stateValue === State.Paused ||
            stateValue === State.Ready ||
            stateValue === State.Stopped
        ) {
            await TrackPlayer.play();
            dispatch(togglePlay(true));
        } else if (stateValue === State.Buffering) {
            console.log('Track is buffering... wait a moment.');
        } else {
            console.log('Unhandled Playback State:', stateValue);
        }
    };


    const cahngesongStatusHandler = () => {
        if (songisFav) {
            dispatch(removefavorite({ id: activeTrack }));
        }
        else {
            dispatch(addFavorite({ id: activeTrack }))
        }
    }

    return (
        <LinearGradient colors={['#4D4D4D', '#121212', '#101010']} style={styles.linearGradient}>
            <View style={styles.header}>
                <Ionicons
                    name='chevron-down'
                    size={24}
                    color="white"
                    onPress={() => navigation.goBack()}
                    style={styles.headerIcon}
                />
                <Text weight='bold' size={18} alignment='center'>
                    {activeTrack?.name || activeTrack?.title}
                </Text>
                <Entypo
                    name='dots-three-horizontal'
                    size={24}
                    color="white"
                />
            </View>
            <View style={styles.imageContainer}>
                <Image
                    source={{
                        uri: activeTrack?.album?.images?.[0]?.url ||
                            activeTrack?.artwork ||
                            activeTrack?.images?.[0]?.url
                    }}
                    style={styles.image}
                />

            </View>
            <View style={styles.trackInfoContainer}>
                <Text weight='bold' size={18}>
                    {activeTrack?.name || activeTrack?.title}
                </Text>
                <View style={styles.artistContainer}>
                    <Text>
                        {activeTrack?.artists?.map(artist => artist.name).join(', ') ||
                            activeTrack?.artist ||
                            activeTrack?.show?.publisher}
                    </Text>

                    <TouchableOpacity onPress={cahngesongStatusHandler}>
                        <Entypo
                            name={songisFav ? 'heart' : 'heart-outlined'}
                            size={24}
                            color="#1DB954"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.playerContainer}>
                <View style={{ marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text size={12}>{formatTime(position)}</Text>
                        <Text size={12}>{formatTime(duration)}</Text>
                    </View>

                    <View style={{
                        height: 4,
                        backgroundColor: '#444',
                        borderRadius: 2,
                        overflow: 'hidden',
                        marginTop: 5,
                    }}>
                        <View style={{
                            height: 4,
                            width: `${(position / duration) * 100}%`,
                            backgroundColor: '#1DB954',
                        }} />
                    </View>
                </View>

                <View style={styles.controlsRow}>

                    <Ionicons name='shuffle' size={24} color="white" />

                    <TouchableOpacity onPress={() =>
                        dispatch(playPreviousTrack())
                    }>
                        <Ionicons name="play-skip-back-sharp" size={27} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={togglePlayback}>
                        <Ionicons
                            name={playbackState?.state === State.Playing ? 'pause-circle-sharp' : 'play-circle-sharp'}
                            size={80}
                            color="#ffffff"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => dispatch(playNextTrack())}>
                        <Ionicons name="play-skip-forward-sharp" size={27} color="white" />
                    </TouchableOpacity>

                    <Ionicons name='repeat' size={27} color="#65D46E" />
                </View>

                <View style={styles.bottomControls}>
                    <View style={styles.beatsPill}>
                        <Image style={styles.beatsIcon} source={images.play1} />
                        <Text weight='regular'>BEATSPILL+</Text>
                    </View>
                    <View style={styles.actionIcons}>
                        <Ionicons name='share-outline' size={24} color="white" />
                        <Entypo name='list' size={24} color="white" />
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
};

export default PlayView;

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 0
    },
    header: {
        marginTop: 80,
        marginBottom: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerIcon: {
        width: 24,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    image: {
        width: horizontalScale(380),
        height: verticalScale(380),
        resizeMode: 'cover',
    },
    trackInfoContainer: {
        marginHorizontal: 20,
        marginBottom: 40,
    },

    artistContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    playerContainer: {
        marginBottom: 40,
    },
    progressBar: {
        width: '100%',
        resizeMode: 'contain',
        marginBottom: 30,
    },
    controlsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    playButton: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    bottomControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    beatsPill: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    beatsIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },

    actionIcons: {
        flexDirection: 'row',
        gap: 20,
    },
});