import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { getMultipleShows } from '../../utils/spotifyApi';
import { showsIds } from '../data/cards';
import { setShows } from '../../store/Library';
import Text from '../components/ui/Text';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { horizontalScale, verticalScale } from '../../utils/responsive';




const ShowsScreen = ({ horizontal = true, itemStyle }) => {
    const [shows, setshows] = useState([]);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchshows = async () => {
            setLoading(true)
            try {
                const data = await getMultipleShows(showsIds);
                console.log('apis', data);
                setshows(data.filter(shows => shows !== null));
                dispatch(setShows(data.filter(shows => shows !== null)));
            } catch (error) {
                console.error('Error fetching shows:', error);
                setshows([]);
            }
            finally {
                setLoading(false)
            }
        };
        fetchshows();
    }, []);
    if (loading) {
        return (
            <LoadingOverlay message='loading shows...' />
        );
    }


    const renderItem = ({ item }) => (
        <TouchableOpacity style={[styles.item, itemStyle]}
            onPress={() => navigation.navigate('EpisodeScreen', {
                shows: item
            })}
        >

            <Image source={{ uri: item.images[0]?.url }} style={[styles.image, itemStyle?.image]} />
            <View >
                <Text marginV={1} marginH={5} weight='bold' size={15} numberOfLines={1} >{item.name}</Text>
                <Text marginH={5} size={16} color='#a5a0a0'>
                    {item.publisher}
                </Text>
                <Text marginH={5} marginV={7} color='gray'>
                    {item.description.replace(/<[^>]*>/g, '').slice(0, 100)}...
                </Text>

                <Text marginH={5} marginV={1} size={15} color='#ffffff'>
                    Total Episodes {item.total_episodes}
                </Text>

            </View>
        </TouchableOpacity>

    );

    return (

        <View style={styles.container}>
            <FlatList
                data={shows}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal={horizontal}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default ShowsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:horizontalScale(450)
    },
    image: {
        width: horizontalScale(66),
        height: verticalScale(64),
        resizeMode: 'cover',
        marginVertical: 10,
        marginHorizontal:10
    },
    
});