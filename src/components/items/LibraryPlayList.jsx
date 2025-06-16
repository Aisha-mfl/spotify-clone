import { Image, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { playlistIds } from '../../data/artist';
import { useDispatch } from 'react-redux';
import { getPlaylist } from '../../../utils/spotifyApi';
import { setplaylists } from '../../../store/Library';
import { useNavigation } from '@react-navigation/native';
import Text from '../ui/Text';
import LoadingOverlay from '../ui/LoadingOverlay';

const LibraryPlayList = () => {
    const [playlist, setPlaylist] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPlaylist = async () => {
            setLoading(true);
            try {
                const data = await getPlaylist(playlistIds);
                console.log('res', data);
                dispatch(setplaylists([data]));
                setPlaylist([data]);
            }
            catch (error) {
                console.error('Failed to fetch artists:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchPlaylist();
    }, []);

    if (loading) {
        return (
            <LoadingOverlay message='searching playlist..' />
        )
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Playlist', {
            type: 'playlist',
            playlist: item,
        })}>
            <View style={styles.container}>
                {item?.images?.[0]?.url && (
                    <Image source={{ uri: item.images[0].url }} style={styles.image} />
                )}
                <View style={styles.titleContainer}>
                    <Text size={18} weight='bold' marginV={5}>{item.name}</Text>
                    <Text size={12} color='#B3B3B3'>{item.description || 'No description'}</Text>
                    <Text color='#B3B3B3'>
                        {item.tracks?.total || 0} tracks
                    </Text>
                </View>
            </View>

        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1 }} >
            <FlatList
                data={playlist}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

export default LibraryPlayList;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 8,
        gap: 15
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 0,
        marginTop: 4,
        resizeMode: 'cover',
    },
    titleContainer: {
        justifyContent: 'center',
    },
    icon: {
        marginRight: 5,
        marginTop: 5
    },
    titleContainer: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'center',
    },
    listContent: {
        paddingBottom: 20,
    },

});