import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { trackIds } from '../../data/songs';
import Fonts from '../../assets/fonts';
import { getMultipleTracks } from '../../../utils/spotifyApi';
import { useNavigation } from '@react-navigation/native';
import Text from '../ui/Text';
import { horizontalScale, verticalScale } from '../../../utils/responsive';



const Songs = () => {
    const navigation = useNavigation();
    const [tracks, setTracks] = useState([]);
    useEffect(() => {
        const fetchTracks = async () => {
            const tracksData = await getMultipleTracks(trackIds);
            console.log("track", tracksData);
            setTracks(tracksData);
        };
        fetchTracks();
    }, []);



    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.trackItem}
            onPress={() =>
                navigation.navigate('playView', {
                    tracks: [item],  
                    index: 0,
                    type: 'track'
                })
            }
        >
            <View style={styles.item}>
                <Image source={{ uri: item.album.images[0]?.url }} style={styles.image} />
                <Text color='#B3B3B3' marginV={3} numberOfLines={1}>{item.name}</Text>
                <Text size={12} color='#B3B3B3' numberOfLines={1}>
                    {item.artists.map(artist => artist.name).join(', ')}
                </Text>
            </View>
        </TouchableOpacity>
    );



    return (
        <View style={styles.container}>
            <Text size={20} weight='bold' marginH={10} marginV={10}>Editor’s picks</Text>
            <FlatList
                data={tracks}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            />
        </View>
    );
};

export default Songs;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: -1,
    },
    item: {
        marginHorizontal: horizontalScale(5),
        marginVertical: verticalScale(2)
    },
    image: {
        width: horizontalScale(154),
        height: verticalScale(154),
        resizeMode: 'cover',
    },
    scrollContent: {
        paddingHorizontal: 5,
    },
});
// , {
//                     track: {
//                         ...item,
//                         preview_url: 'https://p.scdn.co/mp3-preview/e2e03acfd38d7cfa2baa924e0e9c7a80f9b49137?cid=8897482848704f2a8f8d7c79726a70d4'
//                     }
//                 }