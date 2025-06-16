import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { artistIds } from '../../data/artist';
import { useNavigation } from '@react-navigation/native';
import { getMultipleArtists } from '../../../utils/spotifyApi';
import { useDispatch } from 'react-redux';
import { setartists } from '../../../store/Library';
import Text from '../ui/Text';
import { horizontalScale, moderateScale, verticalScale } from '../../../utils/responsive';
import LoadingOverlay from '../ui/LoadingOverlay';



const List = ({horizontal=true ,style, itemStyle}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        const fetchArtist = async () => {
            //setLoading(true);
            try {
                const data = await getMultipleArtists(artistIds);
                dispatch(setartists(data)); 
                setArtists(data);
            }
            catch (error) {
                console.error('Failed to fetch artists:', error);

            }
            finally{
                setLoading(false);
            }
        };
        fetchArtist();

    }, []);
     if (loading) {
        return (
            <LoadingOverlay message='searching Artist..' />
        )
    }
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.item, itemStyle]}
            onPress={() => navigation.navigate('albumlist', {
                artist: item
            })} >

            <Image source={{ uri: item.images[0]?.url }} style={[styles.image, itemStyle?.image]} />
            <View style={[itemStyle?.textcontainer]}>
            <Text size={14} alignment='center' marginV={6} style={[itemStyle?.text]}>{item.name}</Text>
            </View>
        </TouchableOpacity>

    );

    return (
        <View style={styles.container}>
            <FlatList
                data={artists}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal={horizontal}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            />
        </View>
    );
};

export default List;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 1,
    },
    item: {
        marginHorizontal: horizontalScale(8),
    },
    image: {
        width: horizontalScale(105),
        height: verticalScale(105),
        borderRadius:moderateScale(129),
        marginTop: 4,
        resizeMode: 'cover',

    },
    scrollContent: {
        paddingHorizontal: 5,
    }
});