import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { images } from '../../assets/images';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setcurrTrack, togglePlay } from '../../../store/Player';
import TrackPlayer, { Event, State, usePlaybackState, useProgress } from 'react-native-track-player';
import Text from './Text';
import { horizontalScale, verticalScale } from '../../../utils/responsive';

const PlayBar = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const currentTrack = useSelector(state => state.player.currTrack);
    const play = useSelector(state => state.player.isplaying);
    const playbackState = usePlaybackState();
    const { position, duration } = useProgress(200);

    useEffect(() => {
        const listener = TrackPlayer.addEventListener(
            Event.PlaybackActiveTrackChanged,
            async ({ track }) => {
                dispatch(setcurrTrack(track))
            }
        );
        return () => {
            listener.remove();
        };
    }, []);


    const togglePlayback = async () => {
        const stateValue = playbackState?.state || playbackState;
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

    return (
        <View style={{ backgroundColor: '#111111', }}>
            {currentTrack && (
                <View>
                    <TouchableOpacity
                        style={styles.container}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('playView')}
                    >
                        <View style={styles.leftSection}>
                            <Image
                                source={{ uri: currentTrack.artwork }}
                                style={styles.image}
                            />
                            <View style={styles.textContainer}>
                                <Text size={15} weight='bold' marginV={2}>
                                    {currentTrack.title}
                                    <Text size={13} color='#B3B3B3'> • {currentTrack.artist}</Text>
                                </Text>
                                <View style={styles.beatsPillContainer}>
                                    <Image style={styles.beatsIcon} source={images.play1} />
                                    <Text size={11} weight='bold' color='#1DB954'>BEATSPILL+</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.rightSection}>
                            <TouchableOpacity>
                                <Image style={styles.controlIcon} source={images.play1} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={togglePlayback}>
                                <Ionicons
                                    name={play ? 'pause' : 'play'}
                                    size={30}
                                    color='white'
                                    style={styles.controlIcon}
                                />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>


                    <View style={styles.sliderBackground}>
                        <View
                            style={[
                                styles.sliderProgress,
                                { width: `${(position / duration) * 100}%` }
                            ]}
                        />
                    </View>
                </View>
            )}

        </View>
    );
};

export default PlayBar;

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        backgroundColor: '#550A1C',
        height: horizontalScale(59),
        width:verticalScale(410),
        borderRadius: 6,
        marginHorizontal: 5,
        paddingHorizontal: 10,
        marginVertical: -5
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: horizontalScale(39),
        height: verticalScale(39),
        borderRadius: 4,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    beatsPillContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    beatsIcon: {
        width: 18,
        height: 18,
    },
    controlIcon: {
        marginLeft: 8,
    },
    sliderBackground: {
        height: 4,
        backgroundColor: '#702F3D',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 3,
        marginHorizontal: 10, 
    },

    sliderProgress: {
        height: 4,
        backgroundColor: '#e6e9e7',
    }


});