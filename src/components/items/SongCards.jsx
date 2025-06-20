import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { albumIds } from '../../data/cards';
import Fonts from '../../assets/fonts';
import { getMultipleAlbum } from '../../../utils/spotifyApi';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setalbums } from '../../../store/Library';
import Text from '../ui/Text';
import { horizontalScale, verticalScale } from '../../../utils/responsive';
import LoadingOverlay from '../ui/LoadingOverlay';


const SongCards = ({ horizontal = true, itemStyle }) => {
    const [albums, setAlbums] = useState([]);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const data = await getMultipleAlbum(albumIds);
                setAlbums(data.filter(album => album !== null));
                dispatch(setalbums(data.filter(album => album !== null)));
            } catch (error) {
                console.error('Error fetching albums:', error);
                setAlbums([]);
            }
            finally{
                setLoading(false)
            }
        };
        fetchAlbums();
    }, []);
    if (loading) {
        return (
            <LoadingOverlay message='searching Albums...' />
        )
    }


    const renderItem = ({ item }) => (
        <TouchableOpacity style={[styles.item, itemStyle]}
            onPress={() => navigation.navigate('Playlist', {
                type: 'album',
                albumId: item.id,
                albumName: item.name
            })}
        >

            <Image source={{ uri: item.images[0]?.url }} style={[styles.image, itemStyle?.image]} />
            <View >
                <Text marginV={1} marginH={3} style={[styles.text, itemStyle?.text]} size={12} >{item.name}</Text>
                <Text  marginH={3} size={10} style={[styles.artist, itemStyle?.artistText]} color='gray'>
                    {item.artists.map(artist => artist.name).join(', ')}
                </Text>
            </View>
        </TouchableOpacity>

    );

    return (

        <View style={styles.container}>
            <FlatList
                data={albums}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal={horizontal}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            />
        </View>
    );
};

export default SongCards;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        marginHorizontal: 5,
        marginVertical:verticalScale(8)

    },
    image: {
        width: horizontalScale(153),
        height: verticalScale(154.87),
        resizeMode: 'cover',
        marginVertical:verticalScale(5)
    },
    scrollContent: {
        paddingHorizontal: 5,
    },
});